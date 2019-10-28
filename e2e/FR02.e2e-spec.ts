import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR02 - [All menus should be clickable in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
  });

  it('should go to faq page', () => {
    element(by.css('a.nav-link[routerlink="/faq"]')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'faq');
  });

  it('should go to domain page', () => {
    element(by.css('a.nav-link[routerlink="/domain_check"]')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'domain_check');
  });

});
