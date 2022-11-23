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

    const basicHeader = page.locator('.result h3[aria-controls="module-BASIC"]');
    const basicTestcases = page.locator('#module-BASIC article')
    ;
    const basic02Header = page.locator('.result div[aria-controls="testcase-entries-BASIC02 testcase-id-BASIC02"]');
    const basic02Messages = page.locator('#testcase-entries-BASIC02 li');

    await expect(basicHeader).toBeVisible({ timeout: 10000 });
    await expect(basicHeader).toHaveText(/BASIC/);

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
