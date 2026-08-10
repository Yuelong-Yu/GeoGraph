import type { Person } from "@geograph/domain";
import { useEffect, useState } from "react";
import { searchPeople } from "../api.js";
import { useI18n } from "../i18n.js";

export function PersonSearch({ onSelect }: { onSelect: (slug: string) => void }) {
  const { formatYear, personField, personName, t } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void searchPeople(query, controller.signal).then(({ people }) => setResults(people)).catch(() => undefined);
    }, 180);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="person-search">
      <label htmlFor="person-query" className="sr-only">{t("searchPeople")}</label>
      <input
        id="person-query"
        value={query}
        placeholder={t("searchPlaceholder")}
        onFocus={() => setOpen(true)}
        onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
      />
      {open && results.length > 0 && (
        <ul className="search-results">
          {results.map((person) => (
            <li key={person.id}>
              <button type="button" onClick={() => { onSelect(person.slug); setOpen(false); }}>
                <span>{personName(person)}</span>
                <small>{personField(person)} · {formatYear(person.birthYear)}—{person.deathYear ? formatYear(person.deathYear) : t("present")}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
