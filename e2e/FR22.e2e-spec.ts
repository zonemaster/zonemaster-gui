import { test, expect } from '@playwright/test';

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR22 - [Provide the possibility to see more information about encountered errors ' +
    'within the simple view]', () => {

    test.beforeEach(async ({ page }) => {
        await goToHome(page);
        await setLang(page, 'en');
    });

    test('can toggle modules', async ({ page }) => {
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);
        await page.locator('input[name="domain"]').first().focus();

        await page.keyboard.type('results.afNiC.Fr');
        await page.keyboard.press('Enter');

        const basicHeader = page.locator('#zmModule-BASIC .zm-result__module__title');
        const basicHeaderButton = page.locator('#zmModule-BASIC .zm-result__module__title button');
        const basicContent = page.locator('#zmModule-BASIC-content');

        await expect(basicHeader).toBeVisible({ timeout: 10000 });
        await expect(basicHeader).toHaveText(/Basic/i);
        await expect(basicContent).toHaveCount(0);

        await basicHeaderButton.click();

        await expect(basicContent).toHaveCount(1);

        await basicHeaderButton.click();

        await expect(basicContent).toHaveCount(0);
    });
});
