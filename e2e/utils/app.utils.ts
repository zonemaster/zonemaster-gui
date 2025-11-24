import  { expect, type Page } from "@playwright/test";
import { findMockResponse } from "../interceptors/mock.interceptor";

export function goToHome(page: Page) {
  return page.goto('/');
}

export async function mounted(page: Page) {
    await expect(page.locator('body')).toHaveAttribute('data-domain-test-hydrated', 'true');
}

export async function setupApiMocks(page: Page) {
  // Match any URL ending with /api
  await page.route(/\/api$/, async (route) => {
    const request = route.request();
    const method = request.method();
    const url = request.url();

    let body;
    try {
      body = request.postDataJSON();
    } catch (e) {
      body = null;
    }

    const mockResponse = findMockResponse(url, method, body);

    if (mockResponse) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    } else {
      console.log('⚠️  No mock found for request:', { method: body?.method, params: body?.params });
      // If no mock is found, continue with the actual request
      await route.continue();
    }
  });
}

export function setLang(page: Page, lang: string) {
  return Promise.all([
    page.waitForSelector('select#languageSwitcher'),
    page.locator('select#languageSwitcher').selectOption(lang),
  ]);
}

export async function closeOptions(page: Page) {
    const toggle = page.locator('#advanced-toggle');
    const panel = page.locator('#advanced-options');

    // Ensure the toggle is visible/ready
    await expect(toggle).toBeVisible();

    // If it's currently open, close it
    if (await toggle.getAttribute('aria-expanded') === 'true') {
        await toggle.click();
    }

    // Confirm it's actually closed
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Wait for the panel to be hidden / detached
    await panel.waitFor({ state: 'hidden' });
}

export async function showOptions(page: Page) {
    const toggle = page.locator('#advanced-toggle');

    // Wait for toggle to be ready
    await expect(toggle).toBeVisible();

    // Click if not already open
    if (await toggle.getAttribute('aria-expanded') !== 'true') {
        await toggle.click();
    }

    // Ensure it's REALLY open
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Wait for the content you're about to use
    await page.locator('#advanced-options').waitFor({ state: 'visible' });
}

export function clearBrowserCache(page: Page) {
  return Promise.all([
    page.evaluate(() => window.localStorage.clear()),
    page.evaluate(() => window.sessionStorage.clear()),
    page.context().clearCookies(),
  ])
}
