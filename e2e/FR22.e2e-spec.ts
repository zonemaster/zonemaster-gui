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

    await page.locator('#input-domain-form').type('results.afNiC.Fr');
    await page.locator('button.launch').click();

    // Basic header is the second one
    const basicHeader = page.locator('.result h3').nth(1);
    const basicTestcases = page.locator('#module-BASIC section');

    // Basic02 header is the second one in the Basic results
    const basic02Header = page.locator('#module-BASIC h4').nth(1);
    const basic02Messages = page.locator('#testcase-entries-BASIC02 li');

    await expect(basicHeader).toBeVisible({ timeout: 10000 });
    await expect(basicHeader).toHaveText(/Basic/i);

    await expect(basicTestcases).toHaveCount(3);

    for (let idx = 0; idx < 3; idx ++) {
      await expect(basicTestcases.nth(idx)).not.toBeVisible();
    }

    await basicHeader.click();

    for (let idx = 0; idx < 3; idx ++) {
      await expect(basicTestcases.nth(idx)).toBeVisible();
    }

    await expect(basic02Messages).toHaveCount(6);
    for (let idx = 0; idx < 6; idx ++) {
      await expect(basic02Messages.nth(idx)).not.toBeVisible();
    }
    await basic02Header.click();
    for (let idx = 0; idx < 6; idx ++) {
      await expect(basic02Messages.nth(idx)).toBeVisible();
    }


  });
});
