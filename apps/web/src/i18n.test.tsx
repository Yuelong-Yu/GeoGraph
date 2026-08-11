// @vitest-environment jsdom
import type { Person, PersonEvent, PoliticalEntity } from "@geograph/domain";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { I18nProvider, useI18n } from "./i18n.js";

const napoleon: Person = {
  id: "napoleon-bonaparte",
  slug: "napoleon-bonaparte",
  name: "拿破仑·波拿巴",
  nameEn: "Napoleon Bonaparte",
  birthYear: 1769,
  deathYear: 1821,
  primaryField: "政治",
  secondaryFields: [],
};

const coronation: PersonEvent = {
  id: "napoleon-bonaparte:1804:1",
  personId: napoleon.id,
  year: 1804,
  order: 1,
  title: "在巴黎加冕称帝",
  description: "政治",
  longitude: 2.352,
  latitude: 48.857,
};

const shannon: Person = {
  id: "claude-shannon",
  slug: "claude-shannon",
  name: "克劳德·香农",
  nameEn: "Claude Shannon",
  birthYear: 1916,
  deathYear: 2001,
  primaryField: "科学",
  secondaryFields: [],
};

const informationTheoryPublication: PersonEvent = {
  id: "claude-shannon:1948:1",
  personId: shannon.id,
  year: 1948,
  order: 1,
  title: "发表信息论奠基论文",
  description: "在贝尔系统技术期刊发表《通信的数学理论》。",
  longitude: -74.411,
  latitude: 40.684,
};

function LanguageProbe() {
  const { entityName, eventText, formatYear, language, personName, toggleLanguage } = useI18n();
  const entities: PoliticalEntity[] = [
    { id: "china", slug: "china", name: "China", nameEn: "China", primaryColor: "#fff" },
    { id: "russia", slug: "russia", name: "Russia", nameEn: "Russia", primaryColor: "#fff" },
    { id: "saudi-arabia", slug: "saudi-arabia", name: "Saudi Arabia", nameEn: "Saudi Arabia", primaryColor: "#fff" },
    { id: "proto-altaic", slug: "proto-altaic", name: "Prot-Altaic pastoralists", nameEn: "Prot-Altaic pastoralists", primaryColor: "#fff" },
    { id: "untranslated", slug: "untranslated", name: "An untranslated polity", nameEn: "An untranslated polity", primaryColor: "#fff" },
  ];
  return (
    <button type="button" onClick={toggleLanguage}>
      {language}|{personName(napoleon)}|{formatYear(1804)}|{eventText(napoleon, coronation).title}|{entities.map(entityName).join(",")}
    </button>
  );
}

function AddedPersonProbe() {
  const { eventText, personField, personName, personSummary } = useI18n();
  return <p>{personName(shannon)}|{personField(shannon)}|{personSummary(shannon)}|{eventText(shannon, informationTheoryPublication).title}</p>;
}

describe("i18n", () => {
  it("defaults to English and toggles all localized content to Chinese", async () => {
    render(<I18nProvider><LanguageProbe /></I18nProvider>);

    const english = screen.getByRole("button", { name: "en|Napoleon Bonaparte|1804 CE|Crowned Emperor in Paris|China,Russia,Saudi Arabia,Prot-Altaic pastoralists,An untranslated polity" });
    expect(english).toBeDefined();
    await userEvent.click(english);

    expect(screen.getByRole("button", { name: "zh|拿破仑·波拿巴|公元 1804 年|在巴黎加冕称帝|中国,俄罗斯,沙特阿拉伯,原始阿尔泰语系牧民,中文译名待考" })).toBeDefined();
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("ships English copy for people in the expanded historical set", () => {
    render(<I18nProvider><AddedPersonProbe /></I18nProvider>);

    expect(screen.getByText(/Claude Shannon\|Science\|An American mathematician and engineer/).textContent).toContain("Published the foundational information-theory paper");
  });
});
