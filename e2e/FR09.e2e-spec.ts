const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR09 - [Once a language is chosen, all other links should open in that respective language]', () => {
  test.beforeEach(async ({ page })=> {
    await goToHome(page);
    await setLang(page, 'fr');
  });

  test('should keep french when opening faq page', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Nom de domaine');
    await page.locator('a.nav-link[routerlink="/faq"]').click();
    await expect(page.locator('section.main > div > h1')).toHaveText('FAQ');
    await expect(page.locator('a.nav-link[routerlink="/check"]')).toHaveText("Test d'un domaine");
  });
});
