import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR10 - [The undelegated view should have a shortcut to simple view and FAQ]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goTo('preDelegatedDomainCheck');
  });

  it('should have a link to the domain check page', () => {
    expect(element(by.css('a.nav-link[routerlink="/domainCheck"]')).isPresent()).toBe(true);
  });
  it('should have a link to the FAQ page', () => {
    expect(element(by.css('a.nav-link[routerlink="/faq"]')).isPresent()).toBe(true);
  });
});
