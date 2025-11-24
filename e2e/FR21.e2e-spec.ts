import { test, expect } from './global-setup';
import { goToHome, setLang, setupApiMocks } from './utils/app.utils';
import type { Page } from '@playwright/test';

test.describe.serial('Zonemaster test FR21 - [Able to provide a summarized result of the test being run ' +
    '(possibility in different colours for error, warning, success etc.)]', () => {

    let page: Page;

    // Keep the same page between tests
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await setupApiMocks(page);
        await goToHome(page);
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
    });

    test('should display summary', async () => {
        await expect(page.locator('.zm-domain-test__progress-bar')).toHaveCount(0);
        await page.locator('input[name="domain"]').first().focus();

        await page.keyboard.type('results.afNiC.Fr');
        await page.keyboard.press('Enter');

        await expect(page.locator('.zm-result')).toBeVisible({ timeout: 10000 });

        const messageCountBadges = page.locator('.zm-filter-toggle');
        const expectedLabels = ['All', 'Info', 'Notice', 'Warning', 'Error', 'Critical'];

        await expect(messageCountBadges).toHaveCount(expectedLabels.length);

        for (const [idx, label] of expectedLabels.entries()) {
            await expect(messageCountBadges.nth(idx)).toContainText(label);
        }
    });

    test('should display number of each level', async () => {
        await expect(page.locator('.zm-filter-toggle__badge:not(:empty)')).toHaveCount(6);
    });

    test('should display summary with good colors', async () => {
        const filterButtons = page.locator('.zm-filter-toggle input[type="checkbox"]');

        for (const idx of [1, 2, 3, 4, 5]) {
            await filterButtons.nth(idx).click();
        }

        // wait for .2 second (color transition)
        await page.waitForTimeout(200);


        expect(await page.screenshot()).toMatchSnapshot('results.png');
    });
});
