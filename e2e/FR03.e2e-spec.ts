import { test, expect } from '@playwright/test';

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR03 - [All appropriate fields should be writable]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should be able to write in the main input', async ({ page }) => {
    const testString = 'afnic.fr';

    const domainInput = page.locator('#zmDomainTestForm input[name="domain"]').first();

    await domainInput.focus();
    await page.keyboard.type(testString);
    await expect(domainInput).toHaveValue(testString);

    await showOptions(page);
    await page.waitForTimeout(400);

    const nsInput = page.locator('input[name="nameservers[0][ns]"]').first();

    await nsInput.focus();
    await page.keyboard.type(testString);
    await expect(nsInput).toHaveValue(testString);

    const keytagInput = page.locator('input[name="ds_info[0][keytag]"]').first();

    await keytagInput.focus();
    await page.keyboard.type(testString);
    await expect(keytagInput).toHaveValue(testString);
  });
});
