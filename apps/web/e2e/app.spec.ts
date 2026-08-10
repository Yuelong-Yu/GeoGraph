import { expect, test } from "@playwright/test";

test("opens a shared historical person view and advances without closing details", async ({ page }) => {
  await page.goto("/?year=1804&person=napoleon-bonaparte");
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
  await expect(page.getByLabel("Historical timeline").getByText("1804 CE", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Interactive historical globe")).toBeVisible();

  await page.getByRole("button", { name: "中" }).click();
  await expect(page.getByRole("heading", { name: "拿破仑·波拿巴" })).toBeVisible();
  await expect(page.getByRole("button", { name: "En" })).toBeVisible();
  await page.getByRole("button", { name: "En" }).click();
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
  await expect(page.getByRole("button", { name: "中" })).toBeVisible();

  await page.getByRole("button", { name: "Show territory names" }).click();
  await expect(page.getByRole("button", { name: "Hide territory names" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Hide territory names" }).click();
  await expect(page.getByRole("button", { name: "Show territory names" })).toHaveAttribute("aria-pressed", "false");

  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
  await expect.poll(() => new URL(page.url()).searchParams.get("year")).not.toBe("1804");
});
