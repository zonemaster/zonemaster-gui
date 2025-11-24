import {test, expect} from './global-setup';

import {goToHome, setLang, showOptions} from './utils/app.utils';

test.describe('Zonemaster test FR20 - [The user must be able to submit one or more DS record(s) for use with DNSSEC]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
        await showOptions(page);
    });

    test('should display progress bar when we add a DS entry and launch a test', async ({page}) => {
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);

        await page.locator('input[name="domain"]').first().focus();

        await page.keyboard.type('progress.afNiC.Fr');

        await page.locator('input[name="ds_info[0][keytag]"]').first().focus();
        await page.keyboard.type('37610');

        await page.locator('input[name="ds_info[0][digest]"]').first().focus();
        await page.keyboard.type('d2681e301f632bd76544e6d5b6631a12d97b5479ff07cd24efecd19203c77db3');

        await page.locator('select[name="ds_info[0][algorithm]"]').first().selectOption({ label: '8 - RSASHA256' });
        await page.locator('select[name="ds_info[0][digtype]"]').first().selectOption({ label: '2 - SHA-256' });

        await page.keyboard.press('Enter');
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(1);
    });
});
