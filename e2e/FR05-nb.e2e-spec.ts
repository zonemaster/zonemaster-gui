import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-nb - [Supports Norwegian language]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have Norwegian language button', () => {
    expect(element(by.xpath('//a[@lang="nb"]')).isPresent()).toBe(true);
  });

  it('should switch to Norwegian', async () => {
    await utils.setLang('nb');
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Domenenavn"]'))), 5 * 1000);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('nb');
  });
});
