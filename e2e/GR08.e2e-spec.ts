import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR08 - [The advanced view should support the possibility of choosing a profile from multiple profiles]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeAdvancedOptions();
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
