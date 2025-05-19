import {test, expect} from '@playwright/test';

import {goToHome, setLang} from './utils/app.utils';

test.describe('Zonemaster test FR18 - [The GUI should be able to run tests by just providing the domain name]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
    });

    test('should display progress bar', async ({page}) => {
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);
        await page.locator('input[name="domain"]').first().focus();

        await page.keyboard.type('progress.afNiC.Fr');
        await page.keyboard.press('Enter');

        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(1);
    });
});
