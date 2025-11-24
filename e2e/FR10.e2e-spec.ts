import { test, expect } from './global-setup';

import { goToHome, clearBrowserCache } from './utils/app.utils';

test.describe('Zonemaster test FR10 - [On launching the URL opens with a default simple view]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await clearBrowserCache(page);
  });

  test('should have [Run domain test] label visible', async ({ page }) => {
    await expect(page.locator('h1', { hasText: 'Check how your domain is doing'})).toBeVisible();
  });

  test('should have [Options] label visible and NOT selected', async ({ page }) => {
    await expect(page.locator('#advanced-toggle-label', { hasText: 'Show options' })).toBeVisible();
    await expect(page.locator('#advanced-toggle')).toHaveAttribute('aria-expanded', 'false');
  });


  test('should have options NOT visible', async ({ page }) => {
      await expect(page.locator('#advanced-options')).toHaveAttribute('hidden');
  });
});
