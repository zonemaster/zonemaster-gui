import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR13 - [The advanced view should support the possibility of enabling or disabling IPv4 or IPv6]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should have [IPv4 checkbox] visible and are enable', () => {
    expect(element(by.css('#protocol_ipv4')).isPresent()).toBe(true);
    expect(element(by.css('#protocol_ipv4')).isSelected()).toBe(true);
  });
  it('should have [IPv4 checkbox] possible to disable', () => {
    element(by.css('#protocol_ipv4')).click();
    expect(element(by.css('#protocol_ipv4')).isSelected()).toBe(false);
  });
  it('should have [IPv4 checkbox] possible to enable', () => {
    element(by.css('#protocol_ipv4')).click();
    expect(element(by.css('#protocol_ipv4')).isSelected()).toBe(true);
  });

  it('should have [IPv6 checkbox] visible and are enable', () => {
    expect(element(by.css('#protocol_ipv6')).isPresent()).toBe(true);
    expect(element(by.css('#protocol_ipv6')).isSelected()).toBe(true);
  });
  it('should have [IPv6 checkbox] possible to disable', () => {
    element(by.css('#protocol_ipv6')).click();
    expect(element(by.css('#protocol_ipv6')).isSelected()).toBe(false);
  });
  it('should have [IPv6 checkbox] possible to enable', () => {
    element(by.css('#protocol_ipv6')).click();
    expect(element(by.css('#protocol_ipv6')).isSelected()).toBe(true);
  });

  it('should show alert when both are disabled', () => {
    element(by.css('#protocol_ipv4')).click();
    element(by.css('#protocol_ipv6')).click();
    expect(element(by.css('.alert.alert-danger.invalid')).isPresent()).toBe(true);
    expect(element(by.css('.alert.alert-danger.invalid')).getText())
      .toEqual('Choose at least one protocol');
  });
});
