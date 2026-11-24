import { test, expect } from './global-setup';

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR02 - [All menus should be clickable in latest version of different browsers]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should go to faq page', async ({ page, baseURL  }) => {
    await page.locator('a.zm-menu__item[href="/en/faq/"]').click();
    await expect(page).toHaveURL(baseURL + '/en/faq/');
  });

  test('should go to domain page', async ({ page, baseURL }) => {
    await page.locator('a.zm-menu__item[href="/en/"]').click();
    await expect(page).toHaveURL(baseURL + '/en/');
  });
});

test('should render the severity definitions at the FAQ permalink', async ({ page }) => {
  await page.goto('/en/faq/#severity-levels');

  const severityLevels = page.locator('#severity-levels');
  await expect(severityLevels.locator('dl')).toBeVisible();
  await expect(severityLevels.locator('dt')).toHaveText(['Info', 'Notice', 'Warning', 'Error', 'Critical']);
  await expect(severityLevels.locator('dd')).toHaveCount(5);
});
