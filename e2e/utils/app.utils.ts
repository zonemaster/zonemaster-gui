import type { Page } from "@playwright/test";

export function goToHome(page: Page) {
  return page.goto('/');
}

export function setLang(page: Page, lang: string) {
  return Promise.all([
    page.waitForSelector('select#languageSwitcher'),
    page.locator('select#languageSwitcher').selectOption(lang),
  ]);
}

export async function showOptions(page: Page) {
  const showOptionSwitch = page.locator('#advanced-toggle');
  const advancedOption = page.locator('#advanced-options');
  if ((await advancedOption.getAttribute('open')) === null ) {
    return showOptionSwitch.click();
  }
}

export function clearBrowserCache(page: Page) {
  return Promise.all([
    page.evaluate(() => window.localStorage.clear()),
    page.evaluate(() => window.sessionStorage.clear()),
    page.context().clearCookies(),
  ])
}
