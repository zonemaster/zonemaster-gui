const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR02 - [All menus should be clickable in latest version of different browsers]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should go to faq page', async ({ page, baseURL  }) => {
    await page.locator('a.nav-link[routerlink="/faq"]').click();
    await expect(page).toHaveURL(baseURL + '/en/faq');
  });

  test('should go to domain page', async ({ page, baseURL }) => {
    await page.locator('a.nav-link[routerlink="/run-test"]').click();
    await expect(page).toHaveURL(baseURL + '/en/run-test');
  });

});
