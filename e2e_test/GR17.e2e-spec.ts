import { protractor, by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR17 - [All buttons should be clickable in latest version of different browsers]', () => {
  const utils = new Utils();
  const EC = protractor.ExpectedConditions;
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
  });

  it('should display error message', async() => {
    await browser.wait(EC.elementToBeClickable(element(by.css('div button.launch'))), 1 * 1000);
    await expect(element(by.css('div.alert.alert-danger')).isPresent()).toBe(false);
    await element(by.css('div button.launch')).click();
    await browser.wait(() => element(by.css('div.alert.alert-danger')).isPresent(), 10 * 1000);
    await expect(browser.imageComparison.checkFullPageScreen('domain_error_submit_without_domain')).toBeLessThan(1);
  });

  it('should remove error message after 10secs', () => {
    browser.sleep(10 * 1000).then(
      () => {
        expect(element(by.css('.alert.alert-danger')).isPresent()).toBe(false);
      }
    );
  });
});
