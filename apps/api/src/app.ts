import cors from "@fastify/cors";
import { assertHistoricYear, resolvePersonState, resolveTerritories } from "@geograph/domain";
import Fastify from "fastify";
import type { WorldRepository } from "./repositories/world-repository.js";

export interface AppOptions {
  repository: WorldRepository;
  logger?: boolean;
}

export function createApp({ repository, logger = true }: AppOptions) {
  const app = Fastify({ logger });
  void app.register(cors, { origin: true });

  app.get("/health", async () => ({ status: "ok" }));

  app.get<{ Querystring: { year?: string } }>("/api/world", async (request, reply) => {
    let year: number;
    try {
      year = assertHistoricYear(Number(request.query.year));
    } catch (error) {
      return reply.code(400).send({ error: error instanceof Error ? error.message : "Invalid year." });
    }
    const data = await repository.getWorldData(year);
    const territories = resolveTerritories(data.entities, data.territories, year);
    const coverage = territories.length >= 80 ? "较完整" : territories.length > 0 ? "部分" : "基础";
    return {
      year,
      coverage,
      territories,
      people: data.people.flatMap((person) => {
        const state = resolvePersonState(person, data.personEvents, year);
        return state ? [{ person, state }] : [];
      }),
    };
  });

  app.get<{ Querystring: { q?: string } }>("/api/people", async (request) => ({
    people: await repository.searchPeople(request.query.q ?? ""),
  }));

  app.get<{ Querystring: { after?: string } }>("/api/timeline/next-event", async (request, reply) => {
    let after: number;
    try {
      after = assertHistoricYear(Number(request.query.after));
    } catch (error) {
      return reply.code(400).send({ error: error instanceof Error ? error.message : "Invalid year." });
    }
    return { year: await repository.getNextEventYear(after) };
  });

  app.get<{ Params: { slug: string } }>("/api/people/:slug", async (request, reply) => {
    const result = await repository.getPerson(request.params.slug);
    return result ?? reply.code(404).send({ error: "Person not found." });
  });

  app.get<{
    Params: { slug: string };
    Querystring: { longitude?: string; latitude?: string; afterYear?: string };
  }>("/api/entities/:slug", async (request, reply) => {
    const { longitude: longitudeValue, latitude: latitudeValue, afterYear: afterYearValue } = request.query;
    const hasPointContext = longitudeValue !== undefined || latitudeValue !== undefined || afterYearValue !== undefined;
    let context;
    if (hasPointContext) {
      const longitude = Number(longitudeValue);
      const latitude = Number(latitudeValue);
      try {
        const afterYear = assertHistoricYear(Number(afterYearValue));
        if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180
          || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
          throw new Error("Invalid map point.");
        }
        context = { longitude, latitude, afterYear };
      } catch (error) {
        return reply.code(400).send({ error: error instanceof Error ? error.message : "Invalid map point." });
      }
    }
    const result = await repository.getEntity(request.params.slug, context);
    return result ?? reply.code(404).send({ error: "Political entity not found." });
  });

  return app;
}
