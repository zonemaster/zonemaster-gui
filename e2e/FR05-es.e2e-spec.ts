import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-es - [Supports Spanish language]', () => {

  const utils = new Utils();

  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have Spanish language button', () => {
    expect(element(by.xpath('//a[@lang="es"]')).isPresent()).toBe(true);
  });

  it('should switch to Spanish', async () => {
    await utils.setLang('es');
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Nombre de dominio"]'))), 5 * 1000);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('es');
  });
});
