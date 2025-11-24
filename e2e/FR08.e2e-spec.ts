import { test, expect } from './global-setup';

import { goToHome, clearBrowserCache } from './utils/app.utils';

test.describe('Zonemaster test FR08 - [Presence of a default fallback language - English]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await clearBrowserCache(page);
  });

  test('should have a fallback language - English', async ({ page }) => {
    await expect(page.locator('input[name="domain"]')).toHaveAttribute('placeholder', 'Domain name');
  });
});
