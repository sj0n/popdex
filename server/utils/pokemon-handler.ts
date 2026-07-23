import { type H3Event, type EventHandlerRequest } from "h3";
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
  type ErrorResponse,
} from "../types/api-error";
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
 * @returns Promise<T | ErrorResponse | void> - API response with proper headers, status code, and body
 *   - Success: T - the parsed Pokemon data with cache headers
 *   - Error: ErrorResponse - structured error format with appropriate status code
 *   - Cache Hit: void - 304 Not Modified response (via sendNoContent)
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
 *   }
 * }
 */

export default async function pokemonHandler<T>(
  event: H3Event<EventHandlerRequest>,
  fetchFn: (name: string) => Promise<Response>,
): Promise<T | ErrorResponse | void> {
  try {
    const name = validateName(getRouterParam(event, "name"));
    const requestEtag = getRequestHeader(event, "if-none-match");
    const resp = await fetchFn(name);

    if (!resp.ok) {
      switch (resp.status) {
        case 400:
          throw new BadRequestError();
        case 401:
          throw new UnauthorizedError();
        case 403:
          throw new ForbiddenError();
        case 404:
          throw new NotFoundError();
        case 405:
          throw new MethodNotAllowedError();
        case 408:
          throw new RequestTimeoutError();
        case 413:
          throw new PayloadTooLargeError();
        case 422:
          throw new UnprocessableEntityError();
        case 429:
          throw new TooManyRequestsError();
        case 500:
          throw new InternalServerError();
        case 502:
          throw new BadGatewayError();
        case 503:
          throw new ServiceUnavailableError();
        case 504:
          throw new GatewayTimeoutError();
        default:
          throw new InternalServerError(
            `Unexpected HTTP status: ${resp.status}`,
          );
      }
    }

    const upstreamEtag = resp.headers.get("etag");
    const upstreamCacheControl = resp.headers.get("cache-control");

    if (requestEtag === upstreamEtag) {
      setResponseHeader(event, "etag", upstreamEtag);
      return sendNoContent(event, 304);
    }

    const responseHeaders: Record<string, string> = {
      "content-type": "application/json",
      "cache-control": upstreamCacheControl ?? "public, max-age=3600",
    };
    if (upstreamEtag) {
      responseHeaders.etag = upstreamEtag;
    }
    setResponseHeaders(event, responseHeaders);

    const data: T = await resp.json();

    return data;
  } catch (e) {
    const { statusCode, message, error, errorId } = handleApiError(e);
    setResponseHeaders(event, {
      "content-type": "application/json",
      "cache-control": "no-store",
    });
    setResponseStatus(event, statusCode);

    const errorResponse: ErrorResponse = {
      error: error,
      message: message,
      errorId: errorId,
    };

    return errorResponse;
  }
}
