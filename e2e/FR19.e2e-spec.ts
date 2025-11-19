import {test, expect} from '@playwright/test';

import {goToHome, setLang, showOptions} from './utils/app.utils';

test.describe('Zonemaster test FR19 - [The GUI should be able to run the test with at least one name server as input]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await showOptions(page);
    });

    test('should NOT display progress bar when we add a NS ip', async ({page}) => {
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);

        await page.locator('input[name="domain"]').first().focus();
        await page.keyboard.type('progress.afNiC.Fr');

        await page.locator('input[name="nameservers[0][ip]"]').first().focus();
        await page.keyboard.type('192.134.4.1');

        await page.keyboard.press('Enter');

        await expect(page.locator('input[name="nameservers[0][ns]"]:invalid')).toHaveCount(1);
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);
    });

    test('should display progress bar when we add a NS name', async ({page}) => {
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);

        await page.locator('input[name="domain"]').first().focus();
        await page.keyboard.type('progress.afNiC.Fr');

        await page.locator('input[name="nameservers[0][ns]"]').first().focus();
        await page.keyboard.type('ns1.nic.fr');

        await page.keyboard.press('Enter');

        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(1);
    });
});
