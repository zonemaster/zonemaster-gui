import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR01 - [A Home button that sends the user to the default simple view]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
    await utils.setLang('en');
  });

  it('should have a link to go to home page', () => {
    expect(element(by.css('a.navbar-brand')).getAttribute('routerLink')).toBe('/');
    expect(element(by.css('a.navbar-brand')).getAttribute('href')).toBe(browser.baseUrl + '');
  });

});
