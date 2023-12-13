const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR18 - [The GUI should be able to run tests by just providing the domain name]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should display progress bar',  async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeHidden();
    await page.locator('#input-domain-form').type('progress.afNiC.Fr');
    await page.locator('div button.launch').click();
    await expect(page.locator('.progress-bar')).toBeVisible({ timeout: 10000});
  });
});
