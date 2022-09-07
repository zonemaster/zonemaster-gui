const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR20 - [The user must be able to submit one or more DS record(s) for use with DNSSEC]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
    await showOptions(page);
  });

  test('should display progress bar when we add a DS entry and launch a test',  async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeHidden();

    await page.locator('#input_domain_form').type('progress.afNiC.Fr');

    await page.locator('input[formControlName="keytag"]').type('37610');
    await page.locator('input[formControlName="digest"]').type('d2681e301f632bd76544e6d5b6631a12d97b5479ff07cd24efecd19203c77db3');

    await page.locator('select[formControlName="algorithm"]').selectOption({ label: '8 - RSASHA256'});
    await page.locator('select[formControlName="digtype"]').selectOption({ label: '2 - SHA-256'});

    await page.locator('div button.launch').click();
    await expect(page.locator('.progress-bar')).toBeVisible({ timeout: 10000 });
  });
});
