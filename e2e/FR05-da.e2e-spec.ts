import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-da - [Supports Danish language]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have Danish language button', () => {
    expect(element(by.xpath('//a[@lang="da"]')).isPresent()).toBe(true);
  });

  it('should switch to Danish', async () => {
    await utils.setLang('da');
    //expect(element(by.xpath('//h1[.="Domænenavn"]')).isPresent()).toBe(true);
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Domænenavn"]'))), 5 * 1000);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('da');
  });
});
