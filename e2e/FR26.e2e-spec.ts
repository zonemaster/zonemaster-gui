const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR26 - [Should be able to show a progress bar with a rough estimate of the total test progress]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should display progress bar',  async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeHidden();
    await page.locator('#domain_check_name').type('progress.afNiC.Fr');
    await page.locator('div button.launch').click();
    await expect(page.locator('.progress-bar')).toBeVisible({ timeout: 10000});
    await expect(page.locator('.progress-value')).toHaveText('50%');
  });
});
