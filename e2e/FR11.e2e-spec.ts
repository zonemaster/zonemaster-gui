import { test, expect } from './global-setup';
import { closeOptions, goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR11 - [The simple view should look the same in latest version of different browsers]', () => {
    test.beforeEach(async ({ page }) => {
        await goToHome(page);
        await setLang(page, 'en');
        await page.waitForLoadState('networkidle');
    });

    test('should match the domain page', async ({ page }) => {
        await closeOptions(page);
        await page.waitForTimeout(400);
        expect(await page.screenshot()).toMatchSnapshot('domain.png');
    });

    test('should not match the domain page', async ({ page }) => {
        await showOptions(page);
        await page.waitForTimeout(400);
        expect(await page.screenshot()).toMatchSnapshot('domain-options.png');
    });
});
