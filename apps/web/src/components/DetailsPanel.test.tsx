// @vitest-environment jsdom
import type { Person } from "@geograph/domain";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { I18nProvider } from "../i18n.js";
import { DetailsPanel } from "./DetailsPanel.js";

const activePeople: Person[] = [
  {
    id: "isaac-newton",
    slug: "isaac-newton",
    name: "艾萨克·牛顿",
    nameEn: "Isaac Newton",
    birthYear: 1643,
    deathYear: 1727,
    primaryField: "科学",
    secondaryFields: [],
  },
  {
    id: "napoleon-bonaparte",
    slug: "napoleon-bonaparte",
    name: "拿破仑·波拿巴",
    nameEn: "Napoleon Bonaparte",
    birthYear: 1769,
    deathYear: 1821,
    primaryField: "政治",
    secondaryFields: [],
  },
];

function renderPanel(onSelectPerson = vi.fn(), onShowActivePeople = vi.fn()) {
  render(
    <I18nProvider>
      <DetailsPanel
        activeTab="person"
        entity={null}
        person={null}
        activePeople={activePeople}
        year={1804}
        onTabChange={vi.fn()}
        onJumpToEvent={vi.fn()}
        onSelectPerson={onSelectPerson}
        onShowActivePeople={onShowActivePeople}
        followingPerson={false}
        onFollowingPersonChange={vi.fn()}
      />
    </I18nProvider>,
  );
}

describe("DetailsPanel", () => {
  it("defaults the People tab content to a selectable list of people active in the current year", async () => {
    const onSelectPerson = vi.fn();
    renderPanel(onSelectPerson);

    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["People", "Polities"]);
    expect(screen.getByRole("tab", { name: "People" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("heading", { name: "People active in this year" })).toBeDefined();
    expect(screen.getByRole("button", { name: /Isaac Newton/ })).toBeDefined();
    await userEvent.click(screen.getByRole("button", { name: /Napoleon Bonaparte/ }));
    expect(onSelectPerson).toHaveBeenCalledWith("napoleon-bonaparte");
  });

  it("offers a way back to the people active in the current year from a person detail", async () => {
    const onShowActivePeople = vi.fn();
    render(
      <I18nProvider>
        <DetailsPanel
          activeTab="person"
          entity={null}
          person={{ person: activePeople[0]!, events: [], sources: [] }}
          activePeople={activePeople}
          year={1804}
          onTabChange={vi.fn()}
          onJumpToEvent={vi.fn()}
          onSelectPerson={vi.fn()}
          onShowActivePeople={onShowActivePeople}
          followingPerson={false}
          onFollowingPersonChange={vi.fn()}
        />
      </I18nProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Show people active in this year" }));
    expect(onShowActivePeople).toHaveBeenCalledOnce();
  });
});
