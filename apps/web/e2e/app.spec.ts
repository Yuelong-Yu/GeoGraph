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

test("shows a translated historical polity name in Chinese mode", async ({ page }) => {
  const entity = {
    id: "prot-altaic-pastoralists-c576bbe6",
    slug: "prot-altaic-pastoralists-c576bbe6",
    name: "Prot-Altaic pastoralists",
    nameEn: "Prot-Altaic pastoralists",
    aliases: [],
    primaryColor: "#5A9BC4",
    summary: "该疆域来自公元前 1000 年历史快照。",
  };
  await page.route("**/api/world?year=-803", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await route.fulfill({ json: {
      year: -803,
      coverage: "部分",
      territories: [{
        id: "-1000:0:prot-altaic",
        entityId: entity.id,
        validFromYear: -1000,
        validToYear: null,
        controlType: "actual",
        geometry: { type: "Polygon", coordinates: [[[70, 35], [110, 35], [110, 55], [70, 55], [70, 35]]] },
        versionId: "-1000:0:prot-altaic",
        entity,
        color: entity.primaryColor,
      }],
      people: [],
    } });
  });
  await page.route("**/api/entities/prot-altaic-pastoralists-c576bbe6", (route) => route.fulfill({ json: {
    entity,
    successors: [],
    futureControllers: [],
    sources: [],
  } }));
  await page.goto("/?year=-803&entity=prot-altaic-pastoralists-c576bbe6");
  await page.getByRole("button", { name: "中" }).click();

  await expect(page.getByRole("heading", { name: "原始阿尔泰语系牧民" })).toBeVisible();
  await expect(page.getByText("Prot-Altaic pastoralists", { exact: true })).toBeVisible();
});
