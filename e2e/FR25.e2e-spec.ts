const { test, expect } = require('@playwright/test');

import { setLang } from './utils/app.utils';

test.describe('Zonemaster test FR25 - [Should be able to export the result in multiple formats (HTML, CSV, JSON, TEXT)]', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('result/226f6d4f44ae3f80');
    await setLang(page, 'en');
  });

  test('should have an export button',  async ({ page }) => {
    const exportButton = page.locator('button.btn.export');
    await expect(page.locator('button.btn.export')).toBeVisible();
    await expect(exportButton).toHaveText('Export');
  });

  test('should open a modal that contains four export possibilities (HTML, CSV, HTML, TEXT)', async ({ page }) => {
    await page.locator('button.btn.export').click();
    await expect(page.locator('button.btn.export + div.show')).toBeVisible();

    const exportButtons = page.locator('button.btn.export + div.show button.btn');
    await expect(exportButtons).toHaveCount(4);

    const expectedText = ['JSON', 'CSV', 'HTML', 'TEXT'];
    for (const idx in expectedText) {
      await expect(exportButtons.nth(idx)).toHaveText(expectedText[idx]);
    }
  });
});
