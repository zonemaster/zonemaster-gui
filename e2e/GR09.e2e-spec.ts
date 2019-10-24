import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR09 - [The undelegated view must have all options visible]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should have [IPv4 checkbox] visible', () => {
    expect(element(by.css('label[for="protocol_ipv4"]')).isPresent()).toBe(true);
  });
  it('should have [IPv6 checkbox] visible', () => {
    expect(element(by.css('label[for="protocol_ipv6"]')).isPresent()).toBe(true);
  });
  it('should be able to select Default profile', () => {
    expect(element(by.css('select[name="form.profile"]')).getAttribute('ng-reflect-model')).toEqual('default');
  });
});
