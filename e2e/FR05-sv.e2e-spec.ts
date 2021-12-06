import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-sv - [Supports Swedish language]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have Swedish language button', () => {
    expect(element(by.xpath('//a[@lang="sv"]')).isPresent()).toBe(true);
  });

  it('should switch to Swedish', async () => {
    await utils.setLang('sv');
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Domännamn"]'))), 5 * 1000);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('sv');
  });
});
