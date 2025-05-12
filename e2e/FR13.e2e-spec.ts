import { test, expect } from '@playwright/test';

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe.serial('Zonemaster test FR13 - [The advanced view should support the possibility of enabling or disabling IPv4 or IPv6]', () => {
  let page;

  // Keep the same page between tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToHome(page);
    await setLang(page, 'en');
    await showOptions(page);
  });

  test('should have [Disable IPv4 checkbox] visible and disabled', async () => {
    await expect(page.locator('#disable_protocol_ipv4')).toBeVisible();
    await expect(page.locator('#disable_protocol_ipv4')).not.toBeChecked();
  });

  test('should be possible to enable [Disable IPv4 checkbox]', async () => {
    await page.locator('label[for="disable_protocol_ipv4"]').click();
    await expect(page.locator('#disable_protocol_ipv4')).toBeChecked();
  });

  test('should be possible to disable [Disable IPv4 checkbox]', async () => {
    await page.locator('label[for="disable_protocol_ipv4"]').click();
    await expect(page.locator('#disable_protocol_ipv4')).not.toBeChecked();
  });

  test('should have [Disable IPv6 checkbox] visible and disabled', async () => {
    await expect(page.locator('#disable_protocol_ipv6')).toBeVisible();
    await expect(page.locator('#disable_protocol_ipv6')).not.toBeChecked();
  });

  test('should be possible to enable [Disable IPv6 checkbox]', async () => {
    await page.locator('label[for="disable_protocol_ipv6"]').click();
    await expect(page.locator('#disable_protocol_ipv6')).toBeChecked();
  });

  test('should be possible to disable [Disable IPv6 checkbox]', async () => {
    await page.locator('label[for="disable_protocol_ipv6"]').click();
    await expect(page.locator('#disable_protocol_ipv6')).not.toBeChecked();
  });

  test('should show alert when both are disabled', async () => {
    await page.locator('label[for="disable_protocol_ipv4"]').click()
    await page.locator('label[for="disable_protocol_ipv6"]').click()

    const alert = page.locator('#protocol-error');
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText(' Cannot disable both IPv4 and IPv6');
  });
});
