import { expect, test } from "@playwright/test";

test("opens a shared historical person view and advances without closing details", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/?year=1804&person=napoleon-bonaparte");
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
  await expect(page.getByLabel("Historical timeline").getByText("1804 CE", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Interactive historical globe")).toBeVisible();

  await page.getByRole("button", { name: "中" }).click();
  await expect(page.getByRole("heading", { name: "拿破仑·波拿巴" })).toBeVisible();
  await expect(page.getByRole("button", { name: "En" })).toBeVisible();
  const chineseFieldFilter = page.getByRole("button", { name: "按人物领域过滤" });
  await chineseFieldFilter.click();
  await expect(page.getByRole("heading", { name: "人物领域" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "科学家" })).toBeChecked();
  await chineseFieldFilter.click();
  await page.getByRole("button", { name: "En" }).click();
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
  await expect(page.getByRole("button", { name: "中" })).toBeVisible();

  await page.getByRole("button", { name: "Show territory names" }).click();
  await expect(page.getByRole("button", { name: "Hide territory names" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Hide territory names" }).click();
  await expect(page.getByRole("button", { name: "Show territory names" })).toHaveAttribute("aria-pressed", "false");

  const fieldFilter = page.getByRole("button", { name: "Filter people by field" });
  await fieldFilter.click();
  await expect(page.getByRole("heading", { name: "People fields" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Scientists" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Political figures" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Engineering & technology" })).toBeChecked();
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "Scientists" })).not.toBeChecked();
  await page.getByRole("button", { name: "Select all", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "Scientists" })).toBeChecked();
  await fieldFilter.click();
  await expect(fieldFilter).toHaveAttribute("aria-expanded", "false");

  await page.getByRole("button", { name: "Follow person", exact: true }).click();
  await expect(page.getByRole("button", { name: "Stop following", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();

  const globe = page.getByLabel("Interactive historical globe");
  const globeBounds = await globe.boundingBox();
  expect(globeBounds).not.toBeNull();
  const centerX = globeBounds!.x + globeBounds!.width / 2;
  const centerY = globeBounds!.y + globeBounds!.height / 2;
  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.move(centerX + 120, centerY + 40, { steps: 5 });
  await page.mouse.up();

  await expect(page.getByRole("button", { name: "Stop following", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();

  await page.mouse.wheel(0, -400);

  await expect(page.getByRole("button", { name: "Stop following", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
  await expect.poll(() => new URL(page.url()).searchParams.get("year")).not.toBe("1804");
});

test("starts following outside a person's lifetime from their birth year", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("geograph-speed", "1"));
  await page.goto("/?year=1900&person=napoleon-bonaparte");
  await expect(page.getByText("The current year falls outside this person's lifetime")).toBeVisible();

  await page.getByRole("button", { name: "Follow person", exact: true }).click();

  await expect.poll(() => new URL(page.url()).searchParams.get("year"), { timeout: 800 }).toBe("1769");
  await expect(page.getByRole("button", { name: "Stop following", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
});

test("searches, localizes, filters and follows a person from the expanded set", async ({ page }) => {
  await page.goto("/?year=1948");

  await page.getByLabel("Search people").fill("shanon");
  await page.getByRole("button", { name: /Claude Shannon/ }).click();
  await expect(page.getByRole("heading", { name: "Claude Shannon" })).toBeVisible();
  await expect(page.getByText("Published the foundational information-theory paper", { exact: true })).toBeVisible();

  const portrait = await page.request.get("/characters/claude-shannon.png");
  expect(portrait.ok()).toBe(true);
  expect(portrait.headers()["content-type"]).toBe("image/png");

  const fieldFilter = page.getByRole("button", { name: "Filter people by field" });
  await fieldFilter.click();
  await expect(page.getByRole("checkbox", { name: "Thinkers & educators" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Medical figures" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Navigators & explorers" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Economic & social thinkers" })).toBeChecked();
  await fieldFilter.click();

  await page.getByRole("button", { name: "中" }).click();
  await expect(page.getByRole("heading", { name: "克劳德·香农" })).toBeVisible();
  await expect(page.getByText("发表信息论奠基论文", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "跟随人物", exact: true }).click();
  await expect(page.getByRole("button", { name: "退出人物跟随", exact: true })).toBeVisible();
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
