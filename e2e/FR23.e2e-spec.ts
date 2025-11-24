import { test, expect } from './global-setup';

import { setLang } from './utils/app.utils';


test.describe('Zonemaster test FR23 - [Provide a list of previous runs for the domain and should be paginated]', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
    });

    test('should display previous tests', async ({ page }) => {
        await page.locator('input[name="domain"]').first().focus();

        await page.keyboard.type('results.afNiC.Fr');
        await page.keyboard.press('Enter');

        const historyButton = page.locator('#zmHistoryButton');

        await expect(historyButton).toBeVisible({ timeout: 10000 });
        await expect(historyButton).toHaveText('History');
        await historyButton.click();
        await expect(page.locator('#historyDialog')).toBeVisible({ timeout: 10000 });

        await expect(page.locator('#historyDialog li:first-child')).toHaveCount(1);
        await expect(page.locator('#historyDialog footer')).toHaveCount(1);
    });
});
