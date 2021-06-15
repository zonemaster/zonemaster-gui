import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR16 - [The advanced view should have a text describing what undelegated means?]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should have a link to the proper faq answer', () => {
    expect(element(by.css('.alert.alert-info')).isPresent()).toBe(true);
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getAttribute('routerlink')).toBe('/faq');
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getAttribute('fragment')).toBe('q12');
  });

  it('should have a description text in multi languages', async () => {
    await utils.setLang('en');
    await browser.sleep(100);
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getText()).toContain('undelegated');
    await utils.setLang('fr');
    await browser.sleep(100);
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getText()).toContain('non délégué');
    await utils.setLang('sv');
    await browser.sleep(100);
    expect(element(by.css('.alert.alert-info')).element(by.css('a')).getText()).toContain('odelegerat domäntest');
  });
});
