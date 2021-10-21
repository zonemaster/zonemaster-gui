import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-fr - [Supports French language]', () => {

  const utils = new Utils();

  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have French language button', () => {
    expect(element(by.xpath('//a[@lang="fr"]')).isPresent()).toBe(true);
  });

  it('should switch to French', async () => {
    await utils.setLang('fr');
    //expect(element(by.xpath('//h1[.="Nom de domaine"]')).isPresent()).toBe(true);
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Nom de domaine"]'))), 5 * 1000);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('fr');
  });
});
