const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR14 - [The advanced view should support the possibility of choosing a profile from multiple profiles]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
    await showOptions(page);
  });


  test('should have an select form with at least one choice (default)', async ({ page }) => {
    const selectForm = page.locator('select#profile');
    await expect(selectForm).toBeVisible();
    await expect(selectForm.locator('option').nth(0)).toHaveAttribute('value', 'default');
  });
});
