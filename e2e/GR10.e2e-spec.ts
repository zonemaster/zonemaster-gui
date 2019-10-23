import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR13 - [The undelegated view should have a text describing what undelegated means?]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should have a link to the proper faq answer', () => {
    expect(element(by.css('.alert.alert-info')).isPresent()).toBe(true);
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getAttribute('routerlink')).toBe('/faq');
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getAttribute('fragment')).toBe('undelegated');
  });

  it('should have a description text in multi languages', () => {
    utils.setLang('en');
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getText()).toContain('undelegated');
    utils.setLang('fr');
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getText()).toContain('non délégué');
    utils.setLang('sv');
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getText()).toContain('odelegerat domäntest');
  });
});
