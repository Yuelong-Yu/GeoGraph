import type { Person } from "@geograph/domain";
import type { EntityDetails, PersonDetails } from "../api.js";
import { useI18n } from "../i18n.js";

interface DetailsPanelProps {
  activeTab: "entity" | "person";
  entity: EntityDetails | null;
  person: PersonDetails | null;
  activePeople: Person[];
  year: number;
  onTabChange: (tab: "entity" | "person") => void;
  onJumpToEvent: (year: number, longitude: number, latitude: number) => void;
  onSelectPerson: (slug: string) => void;
  followingPerson: boolean;
  onFollowingPersonChange: (following: boolean) => void;
}

export function DetailsPanel({
  activeTab, entity, person, activePeople, year, onTabChange, onJumpToEvent, onSelectPerson, followingPerson, onFollowingPersonChange,
}: DetailsPanelProps) {
  const { entityName, eventText, formatYear, language, personField, personName, personSummary, t } = useI18n();
  const displayedEntityName = entity ? entityName(entity.entity) : "";
  return (
    <aside className="details-panel" aria-label={t("detailsPanel")}>
      <div className="detail-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={activeTab === "person"} onClick={() => onTabChange("person")}>{t("personTab")}</button>
        <button type="button" role="tab" aria-selected={activeTab === "entity"} onClick={() => onTabChange("entity")}>{t("entityTab")}</button>
      </div>

      {activeTab === "entity" ? (
        entity ? (
          <div className="detail-content">
            <span className="eyebrow">{t("politicalEntity")}</span>
            <h2>{displayedEntityName}</h2>
            {language === "zh" && entity.entity.nameEn && entity.entity.nameEn !== displayedEntityName && <p className="latin-name">{entity.entity.nameEn}</p>}
            <p>{language === "en" ? t("historicalBoundarySummary") : entity.entity.summary || t("entitySummaryFallback")}</p>
            <section className="detail-note">
              <h3>{t("successors")}</h3>
              {entity.successors.length > 0 ? <ul>{entity.successors.map((successor) => <li key={successor.id}>{entityName(successor)}</li>)}</ul> : <p>{t("noSuccessors")}</p>}
              <h3>{t("futureControllers")}</h3>
              {entity.futureControllers.length > 0 ? (
                <ol className="future-controller-list">
                  {entity.futureControllers.map((controller) => (
                    <li key={`${controller.entity.id}-${controller.fromYear}`}>
                      <i style={{ background: controller.entity.primaryColor }} />
                      <span><strong>{entityName(controller.entity)}</strong><small>{language === "zh" ? `${formatYear(controller.fromYear)}${t("from")}` : `${t("from")} ${formatYear(controller.fromYear)}`}</small></span>
                    </li>
                  ))}
                </ol>
              ) : <p>{t("noFutureControllers")}</p>}
            </section>
          </div>
        ) : <EmptyState text={t("entityEmpty")} />
      ) : person ? (
        <div className="detail-content person-detail">
          <span className="eyebrow">{personField(person.person)}</span>
          <h2>{personName(person.person)}</h2>
          {language === "zh" && person.person.nameEn && <p className="latin-name">{person.person.nameEn}</p>}
          <p>{formatYear(person.person.birthYear)}—{person.person.deathYear ? formatYear(person.person.deathYear) : t("present")}</p>
          <button type="button" className="follow-button" onClick={() => onFollowingPersonChange(!followingPerson)}>
            {followingPerson ? t("stopFollowing") : t("followPerson")}
          </button>
          {(year < person.person.birthYear || (person.person.deathYear !== null && year > person.person.deathYear)) && (
            <div className="out-of-life">{t("outsideLifetime")}</div>
          )}
          <p>{personSummary(person.person)}</p>
          <h3>{t("keyEvents")}</h3>
          <ol className="event-list">
            {person.events.map((event) => {
              const text = eventText(person.person, event);
              return (
                <li key={event.id}>
                  <button type="button" onClick={() => onJumpToEvent(event.year, event.longitude, event.latitude)}>
                    <time>{formatYear(event.year)}</time>
                    <strong>{text.title}</strong>
                    {text.description && <span>{text.description}</span>}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ) : activePeople.length > 0 ? (
        <div className="detail-content active-people">
          <span className="eyebrow">{formatYear(year)}</span>
          <h2>{t("activePeople")}</h2>
          <ul className="active-people-list">
            {activePeople.map((activePerson) => (
              <li key={activePerson.id}>
                <button type="button" onClick={() => onSelectPerson(activePerson.slug)}>
                  <strong>{personName(activePerson)}</strong>
                  <span>{personField(activePerson)} · {formatYear(activePerson.birthYear)}—{activePerson.deathYear ? formatYear(activePerson.deathYear) : t("present")}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : <EmptyState text={t("activePeopleEmpty")} />}
    </aside>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="empty-detail"><div className="empty-orbit" /><p>{text}</p></div>;
}
