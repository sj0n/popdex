import { describe, it, expect, vi } from "vitest";
import { registerEndpoint } from "@nuxt/test-utils/runtime";
import {
  mockPokemonData,
  mockLocationData,
  mockMovesData,
} from "../fixtures/pokemon-responses";
import { createMockPokemonWorker } from "../__mocks__/worker";
import { NotFoundError, type ErrorResponse } from "@@/server/types/api-error";
import pokemonHandler from "@@/server/utils/pokemon-handler";
import {
  setResponseHeader,
  setResponseStatus,
  getRouterParam,
  getRequestHeader,
  setResponseHeaders,
  sendNoContent,
} from "h3";

vi.stubGlobal("setResponseHeader", setResponseHeader);
vi.stubGlobal("setResponseHeaders", setResponseHeaders);
vi.stubGlobal("setResponseStatus", setResponseStatus);
vi.stubGlobal("getRouterParam", getRouterParam);
vi.stubGlobal("getRequestHeader", getRequestHeader);
vi.stubGlobal("sendNoContent", sendNoContent);

describe("Pokemon API Unit Tests", () => {
  describe("[Success Cases]", () => {
    const worker = createMockPokemonWorker();

    describe("GET /api/pokemon/:name", () => {
      registerEndpoint("/api/pokemon/pikachu", async (event) => {
        event.context.params = { name: "pikachu" };
        return await pokemonHandler(event, worker.getPokemon);
      });

      it("should return pokemon data", async () => {
        const result = await $fetch("/api/pokemon/pikachu");
        expect(result).toEqual(mockPokemonData);
      });
    });

    describe("GET /api/pokemon/:name/locations", () => {
      registerEndpoint("/api/pokemon/pikachu/locations", async (event) => {
        event.context.params = { name: "pikachu" };
        return await pokemonHandler(event, worker.getPokemonLocations);
      });

      it("should return location data", async () => {
        const result = await $fetch("/api/pokemon/pikachu/locations");
        expect(result).toEqual(mockLocationData);
      });
    });

    describe("GET /api/pokemon/:name/moves", () => {
      registerEndpoint("/api/pokemon/pikachu/moves", async (event) => {
        event.context.params = { name: "pikachu" };
        return await pokemonHandler(event, worker.getPokemonMoves);
      });

      it("should return moves data", async () => {
        const result = await $fetch("/api/pokemon/pikachu/moves");
        expect(result).toEqual(mockMovesData);
      });
    });
  });

  describe("[Caching - 304 ETag]", () => {
    const etagValue = '"pikachu-v1"';
    const worker = createMockPokemonWorker();

    describe("GET /api/pokemon/:name [with ETag]", () => {
      registerEndpoint("/api/pokemon/pikachu", async (event) => {
        event.context.params = { name: "pikachu" };
        return await pokemonHandler(event, worker.getPokemon);
      });

      it("should return 200 with ETag header on first request", async () => {
        const resp = await $fetch.raw("/api/pokemon/pikachu");

        expect(resp.status).toBe(200);
        expect(resp.headers.get("etag")).toBe(etagValue);
        expect(resp.headers.get("cache-control")).toBe("public, max-age=3600");
        expect(resp._data).toEqual(mockPokemonData);
      });

      it("should return 304 Not Modified when ETag matches", async () => {
        const resp = await $fetch.raw("/api/pokemon/pikachu", {
          headers: {
            "if-none-match": etagValue,
          },
        });

        expect(resp.status).toBe(304);
        expect(resp._data).toBeFalsy();
      });

      it("should return 200 with data when ETag differs", async () => {
        const differentEtag = '"pikachu-v2"';
        const resp = await $fetch.raw("/api/pokemon/pikachu", {
          headers: {
            "if-none-match": differentEtag,
          },
        });

        expect(resp.status).toBe(200);
        expect(resp._data).toEqual(mockPokemonData);
      });

      it("should return 200 with ETag when if-none-match header is missing", async () => {
        const resp = await $fetch.raw("/api/pokemon/pikachu");

        expect(resp.status).toBe(200);
        expect(resp.headers.get("etag")).toBe(etagValue);
        expect(resp.headers.get("cache-control")).toBe("public, max-age=3600");
        expect(resp._data).toEqual(mockPokemonData);
      });
    });
  });

  describe("[Failed Case]", () => {
    const errObject = new NotFoundError();
    let errResp: ErrorResponse = {
      error: errObject.code,
      message: errObject.message,
    };
    let worker = createMockPokemonWorker({
      pokemon: async () => {
        return new Response(JSON.stringify(errResp), {
          status: 404,
          statusText: errObject.message,
          headers: {
            "content-type": "application/json",
          },
        });
      },
    });

    describe("GET /api/pokemon/:name", () => {
      it("returns 404 on non-existant pokemon", async () => {
        registerEndpoint("/api/pokemon/cat", async (event) => {
          event.context.params = { name: "cat" };
          return await pokemonHandler(event, worker.getPokemon);
        });
        const resp: ErrorResponse = await $fetch("/api/pokemon/cat").catch(
          (e) => e.data,
        );
        expect(resp.error).toBe(errObject.code);
        expect(resp.message).toBe(errObject.message);
      });

      it("returns 400 on name with wrong format", async () => {
        worker = createMockPokemonWorker({
          pokemon: async () => {
            // Set the response body as null because the validation utility throws the error,
            // and the handler would catch and return the Response
            return new Response(null, {
              headers: {
                "content-type": "application/json",
              },
            });
          },
        });
        registerEndpoint("/api/pokemon/p!k@chu", async (event) => {
          event.context.params = { name: "p!k@chu" };
          return await pokemonHandler(event, worker.getPokemon);
        });
        const resp: ErrorResponse = await $fetch("/api/pokemon/p!k@chu").catch(
          (e) => e.data,
        );

        expect(resp.error).toBe("BAD_REQUEST");
        expect(resp.message).toBe(
          "Pokemon name can only contain letters, hyphens and numbers.",
        );
      });
    });
  });
});
