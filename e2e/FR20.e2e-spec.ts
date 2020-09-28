/**
 * Created by pamasse on 05/11/2017.
 */
import { protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR20 - [The user must be able to submit one or more DS record(s) for use with DNSSEC]', () => {
<<<<<<< HEAD
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should display progress bar when we add a NS ip and launch a test',  async() => {
    await expect(element.all(by.css('.progress-result')).isPresent()).toBe(false);
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await element(by.css('input[name="form.keytag"]')).sendKeys('37610');
    await element(by.css('input[name="digest"]')).sendKeys('d2681e301f632bd76544e6d5b6631a12d97b5479ff07cd24efecd19203c77db3');
    await element(by.cssContainingText('select[name="form.algorithm"] > option', 'RSASHA256')).click();
    await element(by.cssContainingText('select[name="form.digtype"] > option', 'SHA-256')).click();
    await element(by.css('div button.launch')).click();
    await element(by.css('div button.launch')).click();
    await browser.wait(() => element(by.css('.progress-bar')).isPresent(), 2 * 1000);
    await expect(element.all(by.css('.progress-result')).isPresent()).toBe(true);
  });
=======
    const utils = new Utils();
    beforeAll(() => {
        utils.goToHome();
        utils.setLang('en');
        utils.activeOptions();
    });

    it('should display progress bar when we add a NS ip and launch a test', async () => {
        await expect(element.all(by.css('.progress-result')).isPresent()).toBe(
            false
        );
        await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
        await element(by.css('input[name="form.keytag"]')).sendKeys('37610');
        await element(by.css('input[name="digest"]')).sendKeys(
            'd2681e301f632bd76544e6d5b6631a12d97b5479ff07cd24efecd19203c77db3'
        );
        await element(
            by.cssContainingText(
                'select[name="form.algorithm"] > option',
                'RSASHA256'
            )
        ).click();
        await element(
            by.cssContainingText(
                'select[name="form.digtype"] > option',
                'SHA-256'
            )
        ).click();
        await element(by.css('div button.launch')).click();
        await element(by.css('div button.launch')).click();
        await expect(element.all(by.css('.progress-result')).isPresent()).toBe(
            true
        );
    });
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53
});
