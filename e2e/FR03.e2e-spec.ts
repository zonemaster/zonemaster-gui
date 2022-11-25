const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR03 - [All appropriate fields should be writable]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should be able to write in the main input', async ({ page }) => {
    const testString = 'afnic.fr';

    const domainInput = page.locator('#input_domain_form');
    await domainInput.type(testString);
    await expect(domainInput).toHaveValue(testString);

    await showOptions(page);

    const nsInput = page.locator('input[formControlName="ns"]');
    await nsInput.type(testString);
    await expect(nsInput).toHaveValue(testString);

    const keytagInput = page.locator('input[formControlName="keytag"]');
    await keytagInput.type(testString);
    await expect(keytagInput).toHaveValue(testString);
  });
});
