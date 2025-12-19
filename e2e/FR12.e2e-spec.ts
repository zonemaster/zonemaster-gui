import {test, expect} from './global-setup';

import {goToHome, setLang, showOptions} from './utils/app.utils';

test.describe('Zonemaster test FR12 - [The simple view should support an advanced view expanding when the checkbox is enabled]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
    });

    test('should have [Disable IPv4 checkbox] && [Disable IPv6 checkbox] NOT visible', async ({page}) => {
        await expect(page.locator('#advanced-options')).toHaveAttribute('hidden');
    });

    test('should have [IPv4 and IPv6 radio] & [IPv4 only radio] & [IPv6 only radio] visible', async ({page}) => {
        await showOptions(page);
        await expect(page.locator('input[name="iptype"][value="both"]')).toBeVisible();
        await expect(page.locator('input[name="iptype"][value="ipv4"]')).toBeVisible();
        await expect(page.locator('input[name="iptype"][value="ipv6"]')).toBeVisible();
    });
});
