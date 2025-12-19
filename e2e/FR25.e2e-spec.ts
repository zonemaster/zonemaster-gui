import { test, expect } from './global-setup';

import { setLang } from './utils/app.utils';

test.describe('Zonemaster test FR25 - [Should be able to export the result in multiple formats (HTML, CSV, JSON, TEXT)]', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
    });

    test('should have an export button', async ({ page }) => {
        await page.locator('input[name="domain"]').first().focus();

        await page.keyboard.type('results.afNiC.Fr');
        await page.keyboard.press('Enter');

        const exportButton = page.locator('#zmExportButton');
        const exportContent = page.locator('#zmExportDialog');

        await expect(exportButton).toBeVisible({ timeout: 10000 });
        await expect(exportButton).toHaveText('Export');
        await expect(exportContent).toBeHidden();
        await exportButton.click();
        await expect(exportContent).toBeVisible({ timeout: 1000 });

        await expect(page.locator('#zmExportDialog button:nth-child(1)')).toHaveText('JSON');
        await expect(page.locator('#zmExportDialog button:nth-child(2)')).toHaveText('HTML');
        await expect(page.locator('#zmExportDialog button:nth-child(3)')).toHaveText('CSV');
        await expect(page.locator('#zmExportDialog button:nth-child(4)')).toHaveText('Text');
    });
});
