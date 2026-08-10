// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PersonFieldFilter } from "./PersonFieldFilter.js";

describe("person field filter", () => {
  it("opens from the right-side button and changes the selected fields", async () => {
    const onChange = vi.fn();
    render(
      <PersonFieldFilter
        fields={["科学", "政治", "工业与技术"]}
        selectedFields={null}
        onSelectedFieldsChange={onChange}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Filter people by field" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    await userEvent.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect((screen.getByRole("checkbox", { name: "Scientists" }) as HTMLInputElement).checked).toBe(true);
    await userEvent.click(screen.getByRole("checkbox", { name: "Political figures" }));
    expect(onChange).toHaveBeenCalledWith(new Set(["科学", "工业与技术"]));

    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenLastCalledWith(new Set());
  });
});
