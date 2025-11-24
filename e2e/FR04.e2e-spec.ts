import { test, expect } from './global-setup';

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR04 - Valid title for the Web interface', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should have right title - Zonemaster', async ({ page }) => {
    await expect(page).toHaveTitle('Zonemaster');
  });
});
