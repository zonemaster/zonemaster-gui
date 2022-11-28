export function goToHome(page) {
  return page.goto('/');
}

export function setLang(page, lang) {
  return Promise.all([
    page.waitForSelector('select#languageSelection'),
    page.locator('select#languageSelection').selectOption(lang),
  ]);
}

export async function showOptions(page) {
  const showOptionCheckbox = page.locator('#advanced_checkbox');
  if (!(await showOptionCheckbox.isChecked())) {
    return showOptionCheckbox.click();
  }
}

export function clearBrowserCache(page) {
  return Promise.all([
    page.evaluate(() => window.localStorage.clear()),
    page.evaluate(() => window.sessionStorage.clear()),
    page.context().clearCookies(),
  ])
}
