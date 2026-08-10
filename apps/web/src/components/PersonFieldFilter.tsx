import { useId, useMemo, useState } from "react";
import { useI18n } from "../i18n.js";

interface PersonFieldFilterProps {
  fields: string[];
  selectedFields: ReadonlySet<string> | null;
  onSelectedFieldsChange: (fields: Set<string> | null) => void;
}

export function PersonFieldFilter({ fields, selectedFields, onSelectedFieldsChange }: PersonFieldFilterProps) {
  const { personFieldCategory, t } = useI18n();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const options = useMemo(() => fields
    .map((field) => ({ field, label: personFieldCategory(field) }))
    .sort((left, right) => left.label.localeCompare(right.label)), [fields, personFieldCategory]);
  const selectedCount = selectedFields === null ? fields.length : selectedFields.size;

  const toggleField = (field: string) => {
    const next = new Set(selectedFields ?? fields);
    if (next.has(field)) next.delete(field);
    else next.add(field);
    onSelectedFieldsChange(next.size === fields.length ? null : next);
  };

  return (
    <div className="person-field-filter">
      <button
        type="button"
        className="person-field-filter-toggle"
        aria-label={t("filterPeopleByField")}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={fields.length === 0}
        onClick={() => setOpen((current) => !current)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        {selectedCount < fields.length && <span>{selectedCount}</span>}
      </button>
      {open && (
        <section id={panelId} className="person-field-filter-panel" aria-label={t("personFieldFilter")}>
          <header>
            <div>
              <small>{t("filterPeopleByField")}</small>
              <h2>{t("personFieldFilter")}</h2>
            </div>
            <strong>{selectedCount}/{fields.length}</strong>
          </header>
          <div className="person-field-filter-actions">
            <button type="button" onClick={() => onSelectedFieldsChange(null)}>{t("selectAll")}</button>
            <button type="button" onClick={() => onSelectedFieldsChange(new Set())}>{t("clear")}</button>
          </div>
          {options.length === 0 ? <p>{t("noPersonFields")}</p> : (
            <ul>
              {options.map(({ field, label }) => (
                <li key={field}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFields === null || selectedFields.has(field)}
                      onChange={() => toggleField(field)}
                    />
                    <i aria-hidden="true" />
                    <span>{label}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
