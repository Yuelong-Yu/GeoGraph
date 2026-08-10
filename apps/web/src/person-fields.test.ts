import { describe, expect, it } from "vitest";
import { filterPeopleByPrimaryFields } from "./person-fields.js";

const people = [
  { person: { slug: "newton", primaryField: "科学" } },
  { person: { slug: "napoleon", primaryField: "政治" } },
  { person: { slug: "musk", primaryField: "工业与技术" } },
];

describe("person primary-field filtering", () => {
  it("shows every person when all fields are selected", () => {
    expect(filterPeopleByPrimaryFields(people, null)).toEqual(people);
  });

  it("shows only people whose primary field is selected", () => {
    expect(filterPeopleByPrimaryFields(people, new Set(["科学", "政治"])))
      .toEqual(people.slice(0, 2));
  });

  it("shows no people when the selection is empty", () => {
    expect(filterPeopleByPrimaryFields(people, new Set())).toEqual([]);
  });
});
