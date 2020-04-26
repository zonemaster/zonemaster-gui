import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR09 - [Once a language is chosen, all other links should open in that respective language]', () => {
    const utils = new Utils();
    beforeAll(() => {
        utils.goToHome();
        utils.setLang('fr');
    });

    it('should keep french when opening faq page', async () => {
        await browser.wait(
            () => element(by.xpath('//h1[.="Nom de domaine"]')).isPresent(),
            21 * 1000
        );
        await element(by.css('a.nav-link[routerlink="/faq"]')).click();
        await expect(element(by.css('section.main > div > h1')).getText()).toBe(
            'FAQ'
        );
        await expect(
            element(by.css('a.nav-link[routerlink="/domain_check"]')).getText()
        ).toBe('Test d\'un domaine');
    });
});
