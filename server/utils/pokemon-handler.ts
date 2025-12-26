import {
  getRequestHeader,
  getRouterParam,
  type H3Event,
  setResponseHeader,
  setResponseHeaders,
  setResponseStatus,
  type EventHandlerRequest,
} from "h3";
import { validateName } from "./validate";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  MethodNotAllowedError,
  RequestTimeoutError,
  PayloadTooLargeError,
  UnprocessableEntityError,
  TooManyRequestsError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
} from "./api-error";
import handleApiError from "./error-handler";

/**
 * Main Pokemon API handler that processes requests, handles caching, and manages errors.
 *
 * This handler provides a comprehensive solution for Pokemon data endpoints with:
 * - Input validation via router parameters
 * - HTTP caching using ETags (RFC 7232)
 * - External API integration through Cloudflare Workers
 * - Response header management
 * - Centralized error handling with structured logging
 *
 * @param event - H3 event object containing request context, parameters, and Cloudflare bindings
 * @param fetchFn - Function that calls the external Pokemon API with the pokemon name
 *
 * @returns Promise<Response> - API response with proper headers, status code, and body
 *   - Success: Response object with Pokemon data and cache headers
 *   - Error: Response object with structured error format and appropriate status code
 *   - Cache Hit: null (for 304 Not Modified responses)
 *
 * @throws {BadRequestError} - When pokemon name validation fails
 * @throws {NotFoundError} - When Pokemon is not found in upstream API
 * @throws {InternalServerError} - For unexpected errors and upstream API failures
 *
 * @example
 * // Usage in API endpoint
 * import pokemonHandler from "@@/server/utils/pokemon-handler";
 *
 * export default defineEventHandler(async (event) => {
 *   return await pokemonHandler(
 *     event,
 *     event.context.cloudflare.env.pokemon.getPokemon
 *   );
 * });
 *
 * @example
 * // Successful response structure
 * {
 *   status: 200,
 *   headers: {
 *     'etag': '"abc123"',
 *     'cache-control': 'public, max-age=3600',
 *     'content-type': 'application/json'
 *   },
 *   body: { id: 25, name: "pikachu", types: ["electric"], ... }
 * }
 *
 * @example
 * // Error response structure
 * {
 *   status: 404,
 *   headers: { 'content-type': 'application/json' },
 *   body: {
 *     message: "Pokemon not found",
 *     error: "NOT_FOUND",
 *     errorId: "a1b2c3d4-..."
 *   }
 * }
 */

export default async function pokemonHandler(
  event: H3Event<EventHandlerRequest>,
  fetchFn: (name: string) => Promise<Response>,
) {
  try {
    const name = validateName(getRouterParam(event, "name"));
    const requestEtag = getRequestHeader(event, "if-none-match");
    const resp = await fetchFn(name);

    if (!resp.ok) {
      switch (resp.status) {
        case 400: throw new BadRequestError();
        case 401: throw new UnauthorizedError();
        case 403: throw new ForbiddenError();
        case 404: throw new NotFoundError();
        case 405: throw new MethodNotAllowedError();
        case 408: throw new RequestTimeoutError();
        case 413: throw new PayloadTooLargeError();
        case 422: throw new UnprocessableEntityError();
        case 429: throw new TooManyRequestsError();
        case 500: throw new InternalServerError();
        case 502: throw new BadGatewayError();
        case 503: throw new ServiceUnavailableError();
        case 504: throw new GatewayTimeoutError();
        default:
          throw new InternalServerError(`Unexpected HTTP status: ${resp.status}`);
      }
    }

    if (requestEtag === resp.headers.get("etag")) {
      setResponseHeader(event, "etag", resp.headers.get("etag"));
      setResponseStatus(event, 304);
      return null;
    }

    setResponseHeaders(event, {
      etag: resp.headers.get("etag"),
      "cache-control": resp.headers.get("cache-control"),
      "content-type": "application/json",
    });

    return resp;
  } catch (e) {
    const { statusCode, message, error } = handleApiError(e);
    setResponseHeader(event, "content-type", "application/json");
    setResponseStatus(event, statusCode);
    return new Response(JSON.stringify({ message, error }));
  }
}
