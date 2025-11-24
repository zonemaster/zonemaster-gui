import {test, expect} from './global-setup';

import {goToHome, setLang, showOptions} from './utils/app.utils';

test.describe.serial('Zonemaster test FR13 - [The advanced view should support the possibility of enabling or disabling IPv4 or IPv6]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
        await showOptions(page);
        await page.waitForTimeout(400);
    });

    test('should have [IPv4 and IPv6 radio] & [IPv4 only radio] & [IPv6 only radio] visible and disabled', async ({page}) => {
        await showOptions(page);
        await page.waitForTimeout(400);
        await expect(page.locator('input[name="iptype"][value="both"]')).toBeVisible();
        await expect(page.locator('input[name="iptype"][value="ipv4"]')).not.toBeChecked();
        await expect(page.locator('input[name="iptype"][value="ipv6"]')).not.toBeChecked();
    });

    test('should be possible to enable [IPv4 only radio]', async ({page}) => {
        await page.locator('input[name="iptype"][value="ipv4"]').click();
        await expect(page.locator('input[name="iptype"][value="ipv4"]')).toBeChecked();
    });

    test('should have [IPv6 only radio] visible and disabled', async ({ page }) => {
        await expect(page.locator('input[name="iptype"][value="ipv6"]')).toBeVisible();
        await expect(page.locator('input[name="iptype"][value="ipv6"]')).not.toBeChecked();
    });

    test('should be possible to enable [IPv6 only]', async ({ page }) => {
        await page.locator('input[name="iptype"][value="ipv6"]').click();
        await expect(page.locator('input[name="iptype"][value="ipv6"]')).toBeChecked();
    });
});
