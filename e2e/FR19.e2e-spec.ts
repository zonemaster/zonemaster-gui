const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR19 - [The GUI should be able to run the test with at least one name server as input]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
    await showOptions(page);
  });

  test('should NOT display progress bar when we add a NS ip',  async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeHidden();
    await page.locator('#input-domain-form').type('progress.afNiC.Fr');
    await page.locator('input[formControlName="ip"]').type('192.134.4.1');
    await page.locator('div button.launch').click();

    // Error message visible to the user
    await expect(page.locator('input[formControlName="ns"] ~ .invalid-feedback')).toBeVisible();
    await expect(page.locator('input[formControlName="ns"] ~ .invalid-feedback')).toContainText('required');

    try {
      await expect(page.locator('.progress-bar')).toBeVisible();
    } catch {}

    await expect(page.locator('.progress-bar')).toBeHidden();
  });

  test('should display progress bar when we add a NS name',  async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeHidden();
    await page.locator('#input-domain-form').type('progress.afNiC.Fr');
    await page.locator('input[formControlName="ns"]').type('ns1.nic.fr');
    await page.locator('div button.launch').click();
    await expect(page.locator('.progress-bar')).toBeVisible({ timeout: 10000 });
  });
});
