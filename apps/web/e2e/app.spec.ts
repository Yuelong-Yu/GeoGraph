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

  await page.getByRole("button", { name: "Hide territory names" }).click();
  await page.getByRole("button", { name: "Hide territory layer" }).click();
  await page.getByRole("button", { name: "Show territory layer" }).click();
  await expect(page.getByRole("button", { name: "Show territory names" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Fixed axis" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Fixed axis" }).click();
  await expect(page.getByRole("button", { name: "Free rotation" })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Free rotation" }).click();
  await expect(page.getByRole("button", { name: "Fixed axis" })).toHaveAttribute("aria-pressed", "true");

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

test("defaults to People and selects a person from the current-year list", async ({ page }) => {
  await page.goto("/?year=1804");

  await expect(page.getByRole("tab", { name: "People" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "People active in this year" })).toBeVisible();
  await page.getByRole("button", { name: /Napoleon Bonaparte/ }).click();
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
});

test("keeps the globe, people details and timeline usable on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?year=1804&person=napoleon-bonaparte");

  const globe = page.getByLabel("Interactive historical globe");
  const details = page.getByLabel("Details panel");
  const timeline = page.getByLabel("Historical timeline");
  await expect(globe).toBeVisible();
  await expect(page.getByRole("heading", { name: "Napoleon Bonaparte" })).toBeVisible();
  await expect(timeline).toBeVisible();
  await expect(page.getByLabel("Search people")).toBeVisible();
  await expect(page.getByRole("button", { name: "Hide territory names" })).toBeVisible();

  const [globeBox, detailsBox, timelineBox] = await Promise.all([
    globe.boundingBox(), details.boundingBox(), timeline.boundingBox(),
  ]);
  expect(globeBox).not.toBeNull();
  expect(detailsBox).not.toBeNull();
  expect(timelineBox).not.toBeNull();
  expect(detailsBox!.y).toBeGreaterThan(globeBox!.y + 100);
  expect(timelineBox!.y).toBeGreaterThan(detailsBox!.y);
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

test("handles both browser forms of a trackpad pinch on the globe", async ({ page }) => {
  await page.goto("/?year=273");
  const canvas = page.getByLabel("Interactive historical globe").locator("canvas");
  await expect(canvas).toBeVisible();

  await expect.poll(() => canvas.evaluate((element) => {
    const chromiumPinch = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
      deltaY: -120,
    });
    element.dispatchEvent(chromiumPinch);
    const webkitPinch = new Event("gesturestart", { bubbles: true, cancelable: true });
    element.dispatchEvent(webkitPinch);
    const webkitChange = new Event("gesturechange", { bubbles: true, cancelable: true });
    Object.defineProperty(webkitChange, "scale", { value: 1.1 });
    element.dispatchEvent(webkitChange);
    return {
      chromium: chromiumPinch.defaultPrevented,
      webkit: webkitPinch.defaultPrevented && webkitChange.defaultPrevented,
    };
  })).toEqual({ chromium: true, webkit: true });
});
