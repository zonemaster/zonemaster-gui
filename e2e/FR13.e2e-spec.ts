import {test, expect} from '@playwright/test';

import {goToHome, setLang, showOptions} from './utils/app.utils';

test.describe.serial('Zonemaster test FR13 - [The advanced view should support the possibility of enabling or disabling IPv4 or IPv6]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await showOptions(page);
    });

    test('should have [Disable IPv4 checkbox] visible and disabled', async ({page}) => {
        await expect(page.locator('input[name="disabledIpType"][value="ipv4"]')).toBeVisible();
        await expect(page.locator('input[name="disabledIpType"][value="ipv4"]')).not.toBeChecked();
    });

    test('should be possible to enable [Disable IPv4 checkbox]', async ({page}) => {
        await page.locator('input[name="disabledIpType"][value="ipv4"]').click();
        await expect(page.locator('input[name="disabledIpType"][value="ipv4"]')).toBeChecked();
    });

    test('should have [Disable IPv6 checkbox] visible and disabled', async ({ page }) => {
        await expect(page.locator('input[name="disabledIpType"][value="ipv6"]')).toBeVisible();
        await expect(page.locator('input[name="disabledIpType"][value="ipv6"]')).not.toBeChecked();
    });

    test('should be possible to enable [Disable IPv6 checkbox]', async ({ page }) => {
        await page.locator('input[name="disabledIpType"][value="ipv6"]').click();
        await expect(page.locator('input[name="disabledIpType"][value="ipv6"]')).toBeChecked();
    });
});
