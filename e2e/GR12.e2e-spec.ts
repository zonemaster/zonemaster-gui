import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR16 - [All menus should be clickable in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
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
