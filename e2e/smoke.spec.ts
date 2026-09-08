import { test, expect, type Page } from "@playwright/test";

/** Fails the test on any uncaught page error or console error, attached per-test. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}

test.describe("Portfolio smoke tests", () => {
  test("page loads and hero content is visible", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "YEHYA JEBARA" })).toBeVisible();
    await expect(page.getByText("Full-Stack Software Engineer")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("main sections exist in the document", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "top",
      "system",
      "introduction",
      "capabilities",
      "projects",
      "skills",
      "experience",
      "how-i-work",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("navigation links scroll to the correct sections", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("link", { name: "Projects", exact: true }).click();
      // Mobile menu collapses (height/opacity transition) before the anchor scroll lands.
      await page.waitForTimeout(1200);
    } else {
      await page.getByRole("link", { name: "Projects", exact: true }).click();
      await page.waitForTimeout(800);
    }

    // The section is much taller than the viewport, so check its heading (near the top
    // of the section) scrolled into view rather than the whole section being in viewport.
    await expect(
      page.getByRole("heading", { name: "Systems built for how the business actually works" }),
    ).toBeInViewport();
  });

  test("project case studies are reachable with real content", async ({ page }) => {
    await page.goto("/#projects");
    await expect(page.getByRole("heading", { name: "Attendance & Workforce ERP" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Desktop POS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AI Customer Service Platform" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Warranty Platform" })).toBeVisible();
  });

  test("contact actions are present and correctly targeted", async ({ page }) => {
    await page.goto("/#contact");
    const emailLink = page.getByRole("link", { name: /ye7ya71048772@gmail\.com/ });
    await expect(emailLink).toHaveAttribute("href", /^mailto:/);

    const phoneLink = page.getByRole("link", { name: /\+961/ });
    await expect(phoneLink).toHaveAttribute("href", /^tel:/);

    const github = page.locator("#contact").getByRole("link", { name: /GitHub/ });
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", /noopener/);
  });

  test("no horizontal overflow at required viewport widths", async ({ page }) => {
    const widths = [360, 390, 768, 1024, 1366, 1440, 1920];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow at width ${width}`).toBe(false);
    }
  });

  test("no uncaught page errors while scrolling the full page", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/");
    await page.waitForTimeout(1000);

    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 800);
      await page.waitForTimeout(150);
    }
    // scroll back up to exercise reverse-direction ScrollTrigger playback
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, -800);
      await page.waitForTimeout(150);
    }

    expect(errors).toEqual([]);
  });

  test("reduced motion renders a usable, static page", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = trackErrors(page);

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "YEHYA JEBARA" })).toBeVisible();

    await page.locator("#system").scrollIntoViewIfNeeded();
    await expect(page.getByText("One engineer, every layer of the stack")).toBeVisible();

    expect(errors).toEqual([]);
    await context.close();
  });

  test("system-journey project preview cards are keyboard reachable", async ({ page }) => {
    // These links start at opacity 0 (revealed by scroll-scrubbed GSAP animation) but must
    // stay in the tab order — a `visibility:hidden` initial state would silently drop them.
    await page.goto("/");
    const cards = page.locator("[data-project-card]");
    await expect(cards).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(cards.nth(i)).toHaveJSProperty("tabIndex", 0);
      const visibility = await cards.nth(i).evaluate((el) => getComputedStyle(el).visibility);
      expect(visibility).toBe("visible");
    }
  });

  test("direct anchor URL to a section after the pinned sequence resolves correctly", async ({ page }) => {
    await page.goto("/#capabilities");
    await page.waitForTimeout(1500);
    const rect = await page.locator("#capabilities").boundingBox();
    expect(rect).not.toBeNull();
    // Section should be at (or very near) the top of the viewport, not scrolled past or short of it.
    expect(Math.abs(rect!.y)).toBeLessThan(100);
  });
});
