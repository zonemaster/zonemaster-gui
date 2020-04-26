import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR11 - [The simple view should look the same in latest version of different browsers]', () => {
    const utils = new Utils();
    beforeAll(() => {
        utils.goToHome();
        utils.setLang('en');
    });

    it('should match the domain page', async () => {
        expect(
            await browser.imageComparison.checkFullPageScreen('domain')
        ).toBeLessThan(5);
    });

    it('should not match the domain page', async () => {
        element(by.css('.switch')).click();
        expect(
            await browser.imageComparison.checkFullPageScreen('domain')
        ).toBeGreaterThan(5);
    });
});
