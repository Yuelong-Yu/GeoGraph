import { expect, test } from "@playwright/test";

test("opens a shared historical person view and advances without closing details", async ({ page }) => {
  await page.goto("/?year=1804&person=napoleon-bonaparte");
  await expect(page.getByRole("heading", { name: "拿破仑·波拿巴" })).toBeVisible();
  await expect(page.getByLabel("历史时间轴").getByText("公元 1804 年", { exact: true })).toBeVisible();
  await expect(page.getByLabel("交互式历史地球")).toBeVisible();

  await page.getByRole("button", { name: "显示疆域名称" }).click();
  await expect(page.getByRole("button", { name: "隐藏疆域名称" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "隐藏疆域名称" }).click();
  await expect(page.getByRole("button", { name: "显示疆域名称" })).toHaveAttribute("aria-pressed", "false");

  await page.getByRole("button", { name: "播放", exact: true }).click();
  await expect(page.getByRole("button", { name: "暂停", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "拿破仑·波拿巴" })).toBeVisible();
  await expect.poll(() => new URL(page.url()).searchParams.get("year")).not.toBe("1804");
});
