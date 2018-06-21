import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR18 - [All appropriate fields (both simple and undelegated) should be writable]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should be able to write in the main input', () => {
    element(by.css('#domain_check_name')).sendKeys('afnic.fr');
    expect(element(by.css('#domain_check_name')).getAttribute('value')).toBe('afnic.fr');
  });

  it('should be able to write in the main input', () => {
    utils.goTo('preDelegatedDomainCheck');
    element(by.css('#domain_check_name')).sendKeys('afnic.fr');
    expect(element(by.css('#domain_check_name')).getAttribute('value')).toBe('afnic.fr');

    element(by.css('input[name="form.ns"]')).sendKeys('afnic.fr');
    expect(element(by.css('input[name="form.ns"]')).getAttribute('value')).toBe('afnic.fr');

    element(by.css('input[name="form.keytag"]')).sendKeys('afnic.fr');
    expect(element(by.css('input[name="form.keytag"]')).getAttribute('value')).toBe('afnic.fr');
  });
});
