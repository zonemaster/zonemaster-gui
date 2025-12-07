import {test, expect} from './global-setup';

import {goToHome, mounted, setLang, showOptions} from './utils/app.utils';

test.describe('Zonemaster test FR16 - [The advanced view should have a text describing what undelegated means]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'en');
        await mounted(page);
        await showOptions(page);
    });

    test('should have a link to the proper faq answer', async ({page}) => {
        await page.waitForTimeout(400);
        const alert = page.locator('#advanced-options div[role="alert"]');
        await expect(alert).toBeVisible();
        await expect(alert.locator('a')).toHaveAttribute('href', '/faq/#undelegated');
    });

    test('should have a description text in multi languages', async ({page}) => {
        const testSuite = [
            {lang: 'en', text: 'undelegated'},
            {lang: 'fr', text: 'non délégué'},
            {lang: 'sv', text: 'odelegerat'},
        ];

        for (const {lang, text} of testSuite) {
            await setLang(page, lang);
            await mounted(page);
            await showOptions(page);
            await page.waitForTimeout(400);

            const alert = page.locator('#advanced-options div[role="alert"]');

            await expect(alert.locator('a')).toContainText(text);
        }
    });
});
