import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR11 - [A Home button that sends the user to the default simple view]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have a link to go to home page', () => {
    expect(element(by.css('a.navbar-brand')).getAttribute('routerLink')).toBe('/');
    expect(element(by.css('a.navbar-brand')).getAttribute('href')).toBe(browser.baseUrl + '');
  });

});
