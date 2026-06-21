import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should have correct title and metadata", async ({ page }) => {
    await page.goto("/");

    // Check Title
    await expect(page).toHaveTitle(
      /Shardendu Mishra \| Software Developer and Engineer/,
    );

    // Check Heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Shardendu Sankritya Mishra/i);
  });

  test("should navigate to projects section", async ({ page }) => {
    await page.goto("/");

    // Scroll to projects section and verify it exists
    const projectsSection = page.locator("#projects");
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeVisible();
  });

  test("visual baseline", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Ensure fonts and animations are fully settled before taking snapshot
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("home-page.png", {
      fullPage: true,
      animations: "disabled",
    });
  });
});
