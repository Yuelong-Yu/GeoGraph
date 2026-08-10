import type { EntityDetails, PersonDetails } from "../api.js";
import { formatYear } from "./Timeline.js";

interface DetailsPanelProps {
  activeTab: "entity" | "person";
  entity: EntityDetails | null;
  person: PersonDetails | null;
  year: number;
  onTabChange: (tab: "entity" | "person") => void;
  onJumpToEvent: (year: number, longitude: number, latitude: number) => void;
  followingPerson: boolean;
  onFollowingPersonChange: (following: boolean) => void;
}

export function DetailsPanel({
  activeTab, entity, person, year, onTabChange, onJumpToEvent, followingPerson, onFollowingPersonChange,
}: DetailsPanelProps) {
  return (
    <aside className="details-panel" aria-label="详情面板">
      <div className="detail-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={activeTab === "entity"} onClick={() => onTabChange("entity")}>政权</button>
        <button type="button" role="tab" aria-selected={activeTab === "person"} onClick={() => onTabChange("person")}>人物</button>
      </div>

      {activeTab === "entity" ? (
        entity ? (
          <div className="detail-content">
            <span className="eyebrow">政治实体</span>
            <h2>{entity.entity.name}</h2>
            {entity.entity.nameEn && <p className="latin-name">{entity.entity.nameEn}</p>}
            <div className="identity-color"><i style={{ background: entity.entity.primaryColor }} />身份主色 · 播放中保持一致</div>
            <p>{entity.entity.summary || "该政治实体的资料正在整理。"}</p>
            <section className="detail-note">
              <h3>相关后继政权</h3>
              {entity.successors.length > 0 ? <ul>{entity.successors.map((successor) => <li key={successor.id}>{successor.name}</li>)}</ul> : <p>当前数据尚未录入明确的政治继承关系。</p>}
              <h3>此地点的后续控制者</h3>
              {entity.futureControllers.length > 0 ? (
                <ol className="future-controller-list">
                  {entity.futureControllers.map((controller) => (
                    <li key={`${controller.entity.id}-${controller.fromYear}`}>
                      <i style={{ background: controller.entity.primaryColor }} />
                      <span><strong>{controller.entity.name}</strong><small>{formatYear(controller.fromYear)}起</small></span>
                    </li>
                  ))}
                </ol>
              ) : <p>当前资料中没有记录该点击位置之后的其他控制实体。</p>}
            </section>
            <section className="detail-note">
              <h3>资料与来源</h3>
              {entity.sources.map((source) => <p key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><br />{source.institution} · {source.license}</p>)}
            </section>
          </div>
        ) : <EmptyState text="点击地球上的疆域，查看当前年份的政权资料。" />
      ) : person ? (
        <div className="detail-content person-detail">
          <span className="eyebrow">{person.person.primaryField}</span>
          <h2>{person.person.name}</h2>
          <p className="latin-name">{person.person.nameEn}</p>
          <p>{formatYear(person.person.birthYear)}—{person.person.deathYear ? formatYear(person.person.deathYear) : "至今"}</p>
          <button type="button" className="follow-button" onClick={() => onFollowingPersonChange(!followingPerson)}>
            {followingPerson ? "退出人物跟随" : "跟随人物"}
          </button>
          {(year < person.person.birthYear || (person.person.deathYear !== null && year > person.person.deathYear)) && (
            <div className="out-of-life">当前年份不在该人物生存期内</div>
          )}
          <p>{person.person.summary}</p>
          <h3>关键事件</h3>
          <ol className="event-list">
            {person.events.map((event) => (
              <li key={event.id}>
                <button type="button" onClick={() => onJumpToEvent(event.year, event.longitude, event.latitude)}>
                  <time>{formatYear(event.year)}</time>
                  <strong>{event.title}</strong>
                  {event.description && <span>{event.description}</span>}
                </button>
              </li>
            ))}
          </ol>
          <section className="detail-note">
            <h3>资料与来源</h3>
            {person.sources.length > 0
              ? person.sources.map((source) => <p key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><br />{source.institution} · {source.license}</p>)
              : <p>演示模式仅加载人物事件；数据库模式会显示完整来源。</p>}
          </section>
        </div>
      ) : <EmptyState text="点击人物或使用搜索，查看生平与活动轨迹。" />}
    </aside>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="empty-detail"><div className="empty-orbit" /><p>{text}</p></div>;
}
