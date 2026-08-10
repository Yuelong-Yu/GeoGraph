import type { WorldData, WorldRepository } from "./world-repository.js";
import { isFuzzyMatch } from "../search.js";

export class MemoryWorldRepository implements WorldRepository {
  constructor(private readonly data: WorldData) {}

  async getWorldData(): Promise<WorldData> {
    return this.data;
  }

  async getNextEventYear(afterYear: number) {
    const followingYear = (year: number) => year === -1 ? 1 : year + 1;
    const candidates = [
      ...this.data.territories.flatMap((territory) => [
        territory.validFromYear,
        ...(territory.validToYear === null ? [] : [followingYear(territory.validToYear)]),
      ]),
      ...this.data.people.flatMap((person) => [
        person.birthYear,
        ...(person.deathYear === null ? [] : [followingYear(person.deathYear)]),
      ]),
      ...this.data.personEvents.map((event) => event.year),
    ].filter((year) => year > afterYear && year <= 2026).sort((a, b) => a - b);
    return candidates[0] ?? null;
  }

  async searchPeople(query: string) {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return this.data.people;
    return this.data.people.filter((person) =>
      [person.name, person.nameEn, ...(person.aliases ?? [])]
        .filter(Boolean)
        .some((name) => name ? isFuzzyMatch(name, normalized) : false),
    );
  }

  async listPersonFields() {
    return [...new Set(this.data.people.map((person) => person.primaryField))]
      .sort((left, right) => left.localeCompare(right, "zh-CN"));
  }

  async getPerson(slug: string) {
    const person = this.data.people.find((candidate) => candidate.slug === slug);
    if (!person) return null;
    return {
      person,
      events: this.data.personEvents
        .filter((event) => event.personId === person.id)
        .sort((a, b) => a.year - b.year || a.order - b.order),
      sources: [],
    };
  }

  async getEntity(slug: string) {
    const entity = this.data.entities.find((candidate) => candidate.slug === slug);
    return entity ? { entity, successors: [], futureControllers: [], sources: [] } : null;
  }
}
