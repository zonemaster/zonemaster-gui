import { test, expect } from '@playwright/test';

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR01 - [A Home button that sends the user to the default simple view]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should have a link to go to home page', async ({ page }) => {
    await expect(page.locator('a.navbar-brand')).toHaveAttribute('href', '/en/');
    await expect(page.locator('a.navbar-brand')).toHaveAttribute('routerLink', '/');
  });
});
