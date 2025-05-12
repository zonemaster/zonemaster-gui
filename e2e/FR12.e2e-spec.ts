import { test, expect } from '@playwright/test';

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR12 - [The simple view should support an advanced view expanding when the checkbox is enabled]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should have [Disable IPv4 checkbox] && [Disable IPv6 checkbox] NOT visible', async ({ page }) => {
    await expect(page.locator('label[for="disable_protocol_ipv4"]')).toBeHidden();
    await expect(page.locator('label[for="disable_protocol_ipv6"]')).toBeHidden();
  });

  test('should have [Disable IPv4 checkbox] & [Disable IPv6 checkbox] visible', async ({ page }) => {
    await showOptions(page);
    await expect(page.locator('label[for="disable_protocol_ipv4"]')).toBeVisible();
    await expect(page.locator('label[for="disable_protocol_ipv6"]')).toBeVisible();
  });
});
