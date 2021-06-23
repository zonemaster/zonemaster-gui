import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR12 - [The simple view should support an advanced view expanding when the checkbox is enabled]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
  });

  it('should have [Disable IPv4 checkbox] && [Disable IPv6 checkbox] NOT visible', () => {
    expect(element(by.css('label[for="disable_protocol_ipv4"]')).isPresent()).toBe(false);
    expect(element(by.css('label[for="disable_protocol_ipv6"]')).isPresent()).toBe(false);
  });
  it('should have [Disable IPv4 checkbox] & [Disable IPv6 checkbox] visible', () => {
    element(by.css('.switch')).click();
    expect(element(by.css('label[for="disable_protocol_ipv4"]')).isPresent()).toBe(true);
    expect(element(by.css('label[for="disable_protocol_ipv6"]')).isPresent()).toBe(true);
  });
});
