const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe.serial('Zonemaster test FR17 - [Able to specify delegation parameters]', () => {
  let page;

  // Keep the same page between tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToHome(page);
    await setLang(page, 'en');
    await showOptions(page);
  });

  test('should have one ns and digest form', async () => {
    await expect(page.locator('div[formArrayName] .row')).toHaveCount(2);
    await expect(page.locator('input[formControlName="keytag"]')).toHaveCount(1);
    await expect(page.locator('input[formControlName="ns"]')).toHaveCount(1);
  });

  test('should be possible to add new ns form', async () => {
    await page.locator('div[formArrayName="nameservers"] .row:first-child .btn.add').click();
    await expect(page.locator('input[formControlName="ns"]')).toHaveCount(2);
    await expect(page.locator('input[formControlName="keytag"]')).toHaveCount(1);
  });

  test('should be possible to add new digest form', async () => {
    await page.locator('div[formArrayName="ds_info"] .row:first-child .btn.add').click();
    await expect(page.locator('input[formControlName="ns"]')).toHaveCount(2);
    await expect(page.locator('input[formControlName="keytag"]')).toHaveCount(2);
  });

  test('should be possible to delete ns forms', async () => {
    await page.locator('div[formArrayName="nameservers"] .row:first-child .btn.delete').click();
    await expect(page.locator('input[formControlName="ns"]')).toHaveCount(1);
    await expect(page.locator('input[formControlName="keytag"]')).toHaveCount(2);
  });
});
