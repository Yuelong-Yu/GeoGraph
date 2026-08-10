// @vitest-environment jsdom
import type { Person, PersonEvent } from "@geograph/domain";
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
  const { eventText, formatYear, language, personName, toggleLanguage } = useI18n();
  return (
    <button type="button" onClick={toggleLanguage}>
      {language}|{personName(napoleon)}|{formatYear(1804)}|{eventText(napoleon, coronation).title}
    </button>
  );
}

describe("i18n", () => {
  it("defaults to English and toggles all localized content to Chinese", async () => {
    render(<I18nProvider><LanguageProbe /></I18nProvider>);

    const english = screen.getByRole("button", { name: "en|Napoleon Bonaparte|1804 CE|Crowned Emperor in Paris" });
    expect(english).toBeDefined();
    await userEvent.click(english);

    expect(screen.getByRole("button", { name: "zh|拿破仑·波拿巴|公元 1804 年|在巴黎加冕称帝" })).toBeDefined();
    expect(document.documentElement.lang).toBe("zh-CN");
  });
});
