import {test, expect} from './global-setup';

import {goToHome, setLang, showOptions} from './utils/app.utils';

test.describe.serial('Zonemaster test FR17 - [Able to specify delegation parameters]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
        await showOptions(page);
        await page.waitForTimeout(400);
    });

    test('should have one ns and digest form', async ({ page }) => {
        await expect(page.locator('fieldset.zm-domain-test__nameservers')).toHaveCount(1);
        await expect(page.locator('fieldset.zm-domain-test__records')).toHaveCount(1);
        await expect(page.locator('input[name="nameservers[0][ns]"]')).toHaveCount(1);
        await expect(page.locator('input[name="ds_info[0][keytag]"]')).toHaveCount(1);
    });

    test('should be possible to add new ns form', async ({ page }) => {
        await page.locator('input[name="nameservers[0][ns]"]').first().focus();

        await page.keyboard.type('ns2.nic.fr');

        await expect(page.locator('input[name="nameservers[1][ns]"]')).toHaveCount(1);
        await expect(page.locator('input[name="ds_info[1][keytag]"]')).toHaveCount(0);
    });

    test('should be possible to add new digest form', async ({ page }) => {
        await page.locator('input[name="ds_info[0][keytag]"]').first().focus();

        await page.keyboard.type('12345');

        await expect(page.locator('input[name="nameservers[1][ns]"]')).toHaveCount(0);
        await expect(page.locator('input[name="ds_info[1][keytag]"]')).toHaveCount(1);
    });

    test('should be possible to delete ns forms', async ({ page }) => {
        await page.locator('input[name="nameservers[0][ns]"]').first().focus();

        await page.keyboard.type('ns2.nic.fr');

        await expect(page.locator('input[name="nameservers[1][ns]"]')).toHaveCount(1);

        await page.locator('fieldset.zm-domain-test__nameserver > div > div > button').first().click();
        await expect(page.locator('input[name="nameservers[1][ns]"]')).toHaveCount(0);
    });
});
