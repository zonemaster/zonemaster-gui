import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR16 - [All menus should be clickable in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should go to inactive domain page', () => {
    element(by.css('a.nav-link[routerlink="/preDelegatedDomainCheck"]')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/preDelegatedDomainCheck');
  });

  it('should go to faq page', () => {
    element(by.css('a.nav-link[routerlink="/faq"]')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/faq');
  });

  it('should go to domain page', () => {
    element(by.css('a.nav-link[routerlink="/domainCheck"]')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/domainCheck');
  });

});
