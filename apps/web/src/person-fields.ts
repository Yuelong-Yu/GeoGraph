interface PersonWithPrimaryField {
  person: { primaryField: string };
}

export function filterPeopleByPrimaryFields<T extends PersonWithPrimaryField>(
  people: T[],
  selectedFields: ReadonlySet<string> | null,
) {
  if (selectedFields === null) return people;
  return people.filter(({ person }) => selectedFields.has(person.primaryField));
}
