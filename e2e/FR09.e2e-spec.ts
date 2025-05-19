import {test, expect} from '@playwright/test';

import {goToHome, setLang} from './utils/app.utils';

test.describe('Zonemaster test FR09 - [Once a language is chosen, all other links should open in that respective language]', () => {
    test.beforeEach(async ({page}) => {
        await goToHome(page);
        await setLang(page, 'fr');
    });

    test('should keep french when opening faq page', async ({page}) => {
        await expect(page.locator('input[name="domain"]')).toHaveAttribute('placeholder', 'Domaine');
        await page.goto('/fr/faq/');
        await expect(page.locator('main h1')).toHaveText('Questions fréquentes');
        await expect(page.locator('a.zm-menu__item[href$="/fr/"]')).toHaveText("Lancer un test");
    });
});
