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

describe("i18n", () => {
  it("defaults to English and toggles all localized content to Chinese", async () => {
    render(<I18nProvider><LanguageProbe /></I18nProvider>);

    const english = screen.getByRole("button", { name: "en|Napoleon Bonaparte|1804 CE|Crowned Emperor in Paris|China,Russia,Saudi Arabia,Prot-Altaic pastoralists,An untranslated polity" });
    expect(english).toBeDefined();
    await userEvent.click(english);

    expect(screen.getByRole("button", { name: "zh|拿破仑·波拿巴|公元 1804 年|在巴黎加冕称帝|中国,俄罗斯,沙特阿拉伯,原始阿尔泰语系牧民,中文译名待考" })).toBeDefined();
    expect(document.documentElement.lang).toBe("zh-CN");
  });
});
