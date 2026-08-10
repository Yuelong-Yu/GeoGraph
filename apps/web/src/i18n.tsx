import type { Person, PersonEvent, PoliticalEntity } from "@geograph/domain";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { localizedTerritoryName } from "./territory-names.js";

export type Language = "en" | "zh";

const messages = {
  en: {
    brandTagline: "The world through time",
    searchPeople: "Search people",
    searchPlaceholder: "Search by name or alias…",
    copied: "Copied",
    copyView: "Copy view",
    disconnected: "Disconnected",
    syncing: "Syncing historical snapshot…",
    coverage: "Coverage",
    coverageBasic: "Basic",
    coveragePartial: "Partial",
    coverageComplete: "Broad",
    worldLoadFailed: "World data could not be loaded",
    actualControl: "Actual control",
    legalClaim: "Claimed territory",
    uncertainFrontier: "Uncertain frontier",
    interactionHint: "Drag to rotate · Scroll to zoom · Click to inspect",
    interactiveGlobe: "Interactive historical globe",
    globalView: "Global view",
    showTerritoryNames: "Show territory names",
    hideTerritoryNames: "Hide territory names",
    peopleCluster: "people",
    clusterHint: "people · click to expand",
    detailsPanel: "Details panel",
    entityTab: "Polities",
    personTab: "People",
    politicalEntity: "Political entity",
    untranslatedEntityName: "Chinese name under review",
    identityColor: "Identity colour · remains consistent during playback",
    entitySummaryFallback: "This polity's historical profile is being prepared.",
    historicalBoundarySummary: "Boundary from the nearest available historical snapshot.",
    successors: "Related successor polities",
    noSuccessors: "No explicit succession relationship is recorded in the current data.",
    futureControllers: "Later controllers of this location",
    from: "from",
    noFutureControllers: "No later controlling polity is recorded for this location.",
    sources: "Sources",
    entityEmpty: "Click a territory on the globe to inspect its polity for the current year.",
    present: "Present",
    stopFollowing: "Stop following",
    followPerson: "Follow person",
    outsideLifetime: "The current year falls outside this person's lifetime",
    keyEvents: "Key events",
    demoSources: "Demo mode includes event data only; database mode displays complete sources.",
    personEmpty: "Click a person or use search to view their life and movements.",
    timeline: "Historical timeline",
    currentEra: "Current year",
    previousYear: "Previous year",
    nextYear: "Next year",
    replay: "Replay from start",
    pause: "Pause",
    play: "Play",
    mode: "Mode",
    continuousYears: "Continuous years",
    historicalEvents: "Historical events",
    speed: "Speed",
    yearsPerSecond: "years/sec",
    timelineHelp: "Scroll to zoom the time range; Shift + scroll to pan",
    selectYear: "Select year",
  },
  zh: {
    brandTagline: "时间中的世界",
    searchPeople: "搜索人物",
    searchPlaceholder: "搜索人物、英文名或别名…",
    copied: "已复制",
    copyView: "复制视图",
    disconnected: "连接中断",
    syncing: "同步历史切片…",
    coverage: "资料覆盖",
    coverageBasic: "基础",
    coveragePartial: "部分",
    coverageComplete: "较完整",
    worldLoadFailed: "世界数据加载失败",
    actualControl: "实际控制",
    legalClaim: "法理宣称",
    uncertainFrontier: "不确定边疆",
    interactionHint: "左键拖动旋转 · 滚轮缩放 · 点击查看",
    interactiveGlobe: "交互式历史地球",
    globalView: "全球视角",
    showTerritoryNames: "显示疆域名称",
    hideTerritoryNames: "隐藏疆域名称",
    peopleCluster: "人",
    clusterHint: "位人物，点击展开",
    detailsPanel: "详情面板",
    entityTab: "政权",
    personTab: "人物",
    politicalEntity: "政治实体",
    untranslatedEntityName: "中文译名待考",
    identityColor: "身份主色 · 播放中保持一致",
    entitySummaryFallback: "该政治实体的资料正在整理。",
    historicalBoundarySummary: "该疆域来自最接近当前年份的可用历史快照。",
    successors: "相关后继政权",
    noSuccessors: "当前数据尚未录入明确的政治继承关系。",
    futureControllers: "此地点的后续控制者",
    from: "起",
    noFutureControllers: "当前资料中没有记录该点击位置之后的其他控制实体。",
    sources: "资料与来源",
    entityEmpty: "点击地球上的疆域，查看当前年份的政权资料。",
    present: "至今",
    stopFollowing: "退出人物跟随",
    followPerson: "跟随人物",
    outsideLifetime: "当前年份不在该人物生存期内",
    keyEvents: "关键事件",
    demoSources: "演示模式仅加载人物事件；数据库模式会显示完整来源。",
    personEmpty: "点击人物或使用搜索，查看生平与活动轨迹。",
    timeline: "历史时间轴",
    currentEra: "当前纪年",
    previousYear: "前一年",
    nextYear: "后一年",
    replay: "从头播放",
    pause: "暂停",
    play: "播放",
    mode: "模式",
    continuousYears: "连续年份",
    historicalEvents: "历史事件",
    speed: "速度",
    yearsPerSecond: "年/秒",
    timelineHelp: "滚轮缩放时间范围，Shift + 滚轮平移",
    selectYear: "选择年份",
  },
} as const;

export type MessageKey = keyof typeof messages.en;

type PersonTranslation = {
  primaryField: string;
  secondaryFields: string[];
  summary: string;
  events: Record<string, { title: string; description: string }>;
};

const englishPeople: Record<string, PersonTranslation> = {
  "isaac-newton": {
    primaryField: "Science",
    secondaryFields: ["Mathematics", "Physics", "Astronomy"],
    summary: "English mathematician, physicist and natural philosopher whose laws of motion, theory of universal gravitation and mathematical work profoundly shaped modern science.",
    events: {
      "1643:1": { title: "Born at Woolsthorpe", description: "Birth" },
      "1654:1": { title: "Entered The King's School, Grantham", description: "Education" },
      "1661:1": { title: "Entered Trinity College, Cambridge", description: "Education" },
      "1665:1": { title: "Returned to Woolsthorpe during the plague", description: "Residence and research" },
      "1667:1": { title: "Returned to Cambridge", description: "Appointment and research" },
      "1669:1": { title: "Appointed Lucasian Professor of Mathematics", description: "Appointment" },
      "1689:1": { title: "Represented Cambridge in Parliament", description: "Public service" },
      "1696:1": { title: "Appointed Warden of the Royal Mint", description: "Appointment" },
      "1727:1": { title: "Died in London", description: "Death" },
    },
  },
  "albert-einstein": {
    primaryField: "Science",
    secondaryFields: ["Physics", "Public intellectual"],
    summary: "Theoretical physicist who developed the theory of relativity and received the Nobel Prize in Physics for the law of the photoelectric effect.",
    events: {
      "1879:1": { title: "Born in Ulm", description: "Birth" },
      "1880:1": { title: "Moved with his family to Munich", description: "Residence" },
      "1894:1": { title: "Moved with his family to Italy", description: "Relocation" },
      "1895:1": { title: "Continued his education in Aarau", description: "Education" },
      "1896:1": { title: "Entered the Swiss Federal Polytechnic in Zurich", description: "Education" },
      "1902:1": { title: "Joined the patent office in Bern", description: "Appointment" },
      "1909:1": { title: "Taught in Zurich", description: "Appointment" },
      "1911:1": { title: "Moved to Prague to teach", description: "Appointment" },
      "1912:1": { title: "Returned to Zurich", description: "Appointment" },
      "1914:1": { title: "Moved to Berlin", description: "Appointment" },
      "1933:1": { title: "Emigrated to Princeton", description: "Relocation" },
      "1955:1": { title: "Died in Princeton", description: "Death" },
    },
  },
  "elon-musk": {
    primaryField: "Industry and technology",
    secondaryFields: ["Business", "Spaceflight", "Transport", "Artificial intelligence"],
    summary: "Entrepreneur involved in founding and leading companies spanning the internet, spaceflight, electric vehicles and artificial intelligence.",
    events: {
      "1971:1": { title: "Born in Pretoria", description: "Birth" },
      "1989:1": { title: "Moved to Canada", description: "Relocation" },
      "1990:1": { title: "Entered Queen's University", description: "Education" },
      "1992:1": { title: "Transferred to the University of Pennsylvania", description: "Education" },
      "1995:1": { title: "Moved to Silicon Valley to build a company", description: "Entrepreneurship" },
      "1999:1": { title: "Co-founded X.com", description: "Entrepreneurship" },
      "2002:1": { title: "Founded SpaceX", description: "Entrepreneurship" },
      "2004:1": { title: "Joined Tesla's board", description: "Business" },
      "2010:1": { title: "Tesla listed on Nasdaq", description: "Business" },
      "2021:1": { title: "Shifted major business activity to Texas", description: "Relocation and business" },
    },
  },
  "qin-shi-huang": {
    primaryField: "Politics",
    secondaryFields: ["Military", "State institutions"],
    summary: "King Zheng of Qin completed the unification of the major Warring States and established the imperial system of the Qin dynasty.",
    events: {
      "-259:1": { title: "Born in Handan", description: "Birth" },
      "-246:1": { title: "Became King of Qin at Xianyang", description: "Accession" },
      "-230:1": { title: "The wars of unification entered their decisive phase", description: "Military and politics" },
      "-221:1": { title: "Completed unification and proclaimed himself First Emperor", description: "State institutions" },
      "-219:1": { title: "Made an eastern progress to the Mount Tai region", description: "Imperial progress" },
      "-218:1": { title: "Survived an assassination attempt at Bolangsha", description: "Imperial progress" },
      "-215:1": { title: "Made an eastern progress to the Jieshi region", description: "Imperial progress" },
      "-210:1": { title: "Died at Shaqiu during an imperial progress", description: "Death" },
    },
  },
  "napoleon-bonaparte": {
    primaryField: "Politics",
    secondaryFields: ["Military", "Law", "State institutions"],
    summary: "French military and political leader whose wars, administrative reforms and legal code profoundly influenced the political order of Europe.",
    events: {
      "1769:1": { title: "Born in Ajaccio", description: "Birth" },
      "1779:1": { title: "Entered the military school at Brienne", description: "Education" },
      "1784:1": { title: "Entered the military school in Paris", description: "Education" },
      "1785:1": { title: "Posted to Valence", description: "Appointment" },
      "1793:1": { title: "Took part in the Siege of Toulon", description: "Military" },
      "1796:1": { title: "Led an army into northern Italy", description: "Military" },
      "1798:1": { title: "Led the expedition to Egypt", description: "Military" },
      "1799:1": { title: "Returned to Paris and launched the Coup of 18 Brumaire", description: "Politics" },
      "1804:1": { title: "Crowned Emperor in Paris", description: "Politics" },
      "1805:1": { title: "Battle of Austerlitz", description: "Military" },
      "1812:1": { title: "Campaign to Moscow", description: "Military" },
      "1814:1": { title: "Exiled to Elba", description: "Exile" },
      "1815:1": { title: "Defeated at Waterloo", description: "Military" },
      "1815:2": { title: "Exiled to Saint Helena", description: "Exile" },
      "1821:1": { title: "Died on Saint Helena", description: "Death" },
    },
  },
  "nicolaus-copernicus": {
    primaryField: "Science",
    secondaryFields: ["Astronomy", "Mathematics", "Economics"],
    summary: "Renaissance astronomer who formulated a systematic heliocentric model of the cosmos and helped transform modern astronomy.",
    events: {
      "1473:1": { title: "Born in Toruń", description: "Birth" },
      "1491:1": { title: "Entered the University of Kraków", description: "Education" },
      "1496:1": { title: "Travelled to Bologna to study", description: "Education" },
      "1500:1": { title: "Pursued scholarly work in Rome", description: "Scholarship" },
      "1501:1": { title: "Studied medicine in Padua", description: "Education" },
      "1503:1": { title: "Received a degree in canon law at Ferrara", description: "Education" },
      "1504:1": { title: "Assisted the Bishop of Warmia at Lidzbark", description: "Appointment" },
      "1510:1": { title: "Moved to Frombork", description: "Appointment and research" },
      "1516:1": { title: "Took office in Olsztyn", description: "Appointment" },
      "1521:1": { title: "Returned to Frombork", description: "Appointment and research" },
      "1543:1": { title: "On the Revolutions was published; died in Frombork", description: "Publication and death" },
    },
  },
};

type I18nValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: MessageKey) => string;
  formatYear: (year: number) => string;
  formatTick: (year: number) => string;
  personName: (person: Person) => string;
  personField: (person: Person) => string;
  personSummary: (person: Person) => string;
  eventText: (person: Person, event: PersonEvent) => { title: string; description?: string };
  entityName: (entity: PoliticalEntity) => string;
  territoryLabel: (entity: PoliticalEntity) => string | null;
};

const I18nContext = createContext<I18nValue | null>(null);

function createI18nValue(language: Language, toggleLanguage: () => void): I18nValue {
  return {
    language,
    toggleLanguage,
    t: (key) => messages[language][key],
    formatYear: (year) => language === "zh"
      ? year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`
      : year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`,
    formatTick: (year) => language === "zh"
      ? year < 0 ? `前${Math.abs(year)}` : String(year)
      : year < 0 ? `${Math.abs(year)} BCE` : String(year),
    personName: (person) => language === "en" ? person.nameEn ?? person.name : person.name,
    personField: (person) => language === "en"
      ? englishPeople[person.slug]?.primaryField ?? person.primaryField
      : person.primaryField,
    personSummary: (person) => language === "en"
      ? englishPeople[person.slug]?.summary ?? "Biographical information is being prepared."
      : person.summary ?? "该人物的生平资料正在整理。",
    eventText: (person, event) => {
      const translated = language === "en" ? englishPeople[person.slug]?.events[`${event.year}:${event.order}`] : undefined;
      return translated ?? { title: event.title, ...(event.description ? { description: event.description } : {}) };
    },
    entityName: (entity) => localizedTerritoryName(entity, language) ?? messages[language].untranslatedEntityName,
    territoryLabel: (entity) => localizedTerritoryName(entity, language),
  };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const toggleLanguage = useCallback(() => setLanguage((current) => current === "en" ? "zh" : "en"), []);
  const value = useMemo(() => createI18nValue(language, toggleLanguage), [language, toggleLanguage]);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const defaultI18n = createI18nValue("en", () => undefined);

export function useI18n() {
  return useContext(I18nContext) ?? defaultI18n;
}
