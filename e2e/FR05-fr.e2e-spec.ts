import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR06-fr - [Supports French language]', () => {

  const utils = new Utils();

  beforeAll(() => {
    utils.goToHome();
  });

  it('should have French language button', () => {
    expect(element(by.xpath('//a[@lang="fr"]')).isPresent()).toBe(true);
  });

  it('should switch to French', () => {
    utils.setLang('fr');
    expect(element(by.xpath('//h1[.="Nom de domaine"]')).isPresent()).toBe(true);
  });
});
