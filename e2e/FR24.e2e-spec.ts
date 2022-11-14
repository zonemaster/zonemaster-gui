const { test, expect } = require('@playwright/test');

import { setLang } from './utils/app.utils';

test.describe('Zonemaster test FR24 - [The list of previous runs should contain links to the previous tests]', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('result/226f6d4f44ae3f80');
    await setLang(page, 'en');
  });

  test('should display previous run link',  async ({ page }) => {

    const historyButton = page.locator('a.btn.history');
    await expect(historyButton).toBeVisible();
    await expect(historyButton).toHaveText('History');
    await historyButton.click();
    await expect(page.locator('ngb-modal-window')).toBeVisible();

    await expect(page.locator('.list-group-item.list-group-item-action.list-group-item-success a').first()).toHaveAttribute('href', '/en/result/84bfac6ae74d0e62');
    await expect(page.locator('.list-group-item.list-group-item-action.list-group-item-danger a').first()).toHaveAttribute('href', '/en/result/293f626579274f18');
  });
});
