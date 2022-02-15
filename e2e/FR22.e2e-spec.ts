const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR22 - [Provide the possibility to see more information about encountered errors ' +
  'within the simple view]', () => {

    test.beforeEach(async ({ page }) => {
      await goToHome(page);
      await setLang(page, 'en');
    });

  test('should display full messages',  async({ page }) => {
    await expect(page.locator('.progress-bar')).toBeHidden();

    await page.locator('#domain_check_name').type('results.afNiC.Fr');
    await page.locator('div button.launch').click();

    const basicHeader = page.locator('.result h3.BASIC');
    const basicMessages = page.locator('.expanded #module-BASIC .entry');

    await expect(basicHeader).toBeVisible({ timeout: 10000 });
    await expect(basicHeader).toHaveText('BASIC');

    await expect(basicMessages).toHaveCount(0);
    await basicHeader.click();
    await expect(basicMessages).toHaveCount(14);
  });
});
