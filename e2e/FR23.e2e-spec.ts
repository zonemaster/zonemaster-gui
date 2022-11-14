const { test, expect } = require('@playwright/test');

import { setLang } from './utils/app.utils';


test.describe('Zonemaster test FR23 - [Provide a list of previous runs for the domain and should be paginated]', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/result/226f6d4f44ae3f80');
    await setLang(page, 'en');
  });

  test('should display previous tests',  async ({ page }) => {
    const historyButton = page.locator('a.btn.history');

    await expect(historyButton).toBeVisible();
    await expect(historyButton).toHaveText('History');
    await historyButton.click();
    await expect(page.locator('ngb-modal-window')).toBeVisible();

    await expect(page.locator('.list-group-item.list-group-item-action.list-group-item-success')).toHaveCount(9);
    await expect(page.locator('.list-group-item.list-group-item-action.list-group-item-danger')).toHaveCount(1);
    await expect(page.locator('ul.pagination > li')).toHaveCount(7);
  });
});
