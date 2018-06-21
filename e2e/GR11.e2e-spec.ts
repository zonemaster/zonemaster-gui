import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR11 - [The undelegated view must inherit all of the advanced view options]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goTo('preDelegatedDomainCheck');
  });

  it('should have [IPv4 checkbox] visible', () => {
    expect(element(by.css('label[for="protocol_ipv4"]')).isPresent()).toBe(true);
  });
  it('should have [IPv6 checkbox] visible', () => {
    expect(element(by.css('label[for="protocol_ipv6"]')).isPresent()).toBe(true);
  });
  it('should be able to select Default profile', () => {
    expect(element(by.css('select[name="form.profile"]')).getAttribute('ng-reflect-model')).toEqual('default_profile');
  });
  it('should be able to select IANA profile', () => {
    element(by.cssContainingText('option', 'IANA profile')).click();
    expect(element(by.css('select[name="form.profile"]')).getAttribute('ng-reflect-model')).toEqual('test_profile_1');
  });
  it('should be able to select Test profile 2', () => {
    element(by.cssContainingText('option', 'Test profile 2')).click();
    expect(element(by.css('select[name="form.profile"]')).getAttribute('ng-reflect-model')).toEqual('test_profile_2');
  });

});
