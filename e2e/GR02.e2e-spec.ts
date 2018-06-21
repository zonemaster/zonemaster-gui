import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR02 - [Supports French language]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have French language button', () => {
    expect(element(by.xpath('//a[@lang="fr"]')).isPresent()).toBe(true);
  });

  it('should switch to French', () => {
    element(by.xpath('//a[@lang="fr"]')).click();
    expect(element(by.xpath('//h1[.="Nom de domaine"]')).isPresent()).toBe(true);
    // expect(element(by.css('a.nav-link.active'))).toEqual('Test d\'un domaine');
  });
});
