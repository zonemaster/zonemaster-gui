import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR03 - [All appropriate fields should be writable]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
  });

  it('should be able to write in the main input', () => {
    element(by.css('#domain_check_name')).sendKeys('afnic.fr');
    expect(element(by.css('#domain_check_name')).getAttribute('value')).toBe('afnic.fr');

    utils.activeOptions();
    expect(element(by.css('#domain_check_name')).getAttribute('value')).toBe('afnic.fr');

    element(by.css('input[name="form.ns"]')).sendKeys('afnic.fr');
    expect(element(by.css('input[formControlName="ns"]')).getAttribute('value')).toBe('afnic.fr');

    element(by.css('input[name="form.keytag"]')).sendKeys('afnic.fr');
    expect(element(by.css('input[formControlName="keytag"]')).getAttribute('value')).toBe('afnic.fr');
  });
});
