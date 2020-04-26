/**
 * Created by pamasse on 05/11/2017.
 */
import { protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe(
    'Zonemaster test FR21 - [Able to provide a summarized result of the test being run ' +
        '(possibility in different colours for error, warning, success etc.)]',
    () => {
        const utils = new Utils();
        beforeAll(() => {
            utils.goToHome();
            utils.setLang('en');
            utils.activeOptions();
            utils.clearBrowserCache();
        });

        it('should display summary', async () => {
            await expect(
                element.all(by.css('.progress-result')).isPresent()
            ).toBe(false);
            await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
            await element(by.css('div button.launch')).click();

            await browser.wait(
                () => element(by.css('div.result.container')).isPresent(),
                120 * 1000
            );

            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .count()
            ).toEqual(6);
            await browser.sleep(1000);
            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .get(0)
                    .getText()
            ).toBe('All 123');
            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .get(1)
                    .getText()
            ).toBe('Info 119');
            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .get(2)
                    .getText()
            ).toBe('Notice 4');
            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .get(3)
                    .getText()
            ).toBe('Warning 0');
            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .get(4)
                    .getText()
            ).toBe('Error 0');
            await expect(
                element
                    .all(
                        by.css('.nav.nav-pills.vertical-align.filter > li > a')
                    )
                    .get(5)
                    .getText()
            ).toBe('Critical 0');
        });

        it('should display number of each level', async () => {
            await expect(
                element
                    .all(
                        by.css(
                            '.nav.nav-pills.vertical-align.filter > li > a > span.badge'
                        )
                    )
                    .get(0)
                    .getText()
            ).toBe('123');
            await expect(
                element
                    .all(
                        by.css(
                            '.nav.nav-pills.vertical-align.filter > li > a > span.badge'
                        )
                    )
                    .get(1)
                    .getText()
            ).toBe('119');
            await expect(
                element
                    .all(
                        by.css(
                            '.nav.nav-pills.vertical-align.filter > li > a > span.badge'
                        )
                    )
                    .get(2)
                    .getText()
            ).toBe('4');
            await expect(
                element
                    .all(
                        by.css(
                            '.nav.nav-pills.vertical-align.filter > li > a > span.badge'
                        )
                    )
                    .get(3)
                    .getText()
            ).toBe('0');
            await expect(
                element
                    .all(
                        by.css(
                            '.nav.nav-pills.vertical-align.filter > li > a > span.badge'
                        )
                    )
                    .get(4)
                    .getText()
            ).toBe('0');
            await expect(
                element
                    .all(
                        by.css(
                            '.nav.nav-pills.vertical-align.filter > li > a > span.badge'
                        )
                    )
                    .get(5)
                    .getText()
            ).toBe('0');
        });

        it('should display summary with good colors', async () => {
            await element
                .all(by.css('.nav.nav-pills.vertical-align.filter > li > a'))
                .get(1)
                .click();
            await element
                .all(by.css('.nav.nav-pills.vertical-align.filter > li > a'))
                .get(2)
                .click();
            await element
                .all(by.css('.nav.nav-pills.vertical-align.filter > li > a'))
                .get(3)
                .click();
            await element
                .all(by.css('.nav.nav-pills.vertical-align.filter > li > a'))
                .get(4)
                .click();
            await element
                .all(by.css('.nav.nav-pills.vertical-align.filter > li > a'))
                .get(5)
                .click();
            expect(
                await browser.imageComparison.checkFullPageScreen('result')
            ).toBeLessThan(5);
        });
    }
);
