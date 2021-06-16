import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-fi - [Supports Finnish language]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have Finnish language button', () => {
    expect(element(by.xpath('//a[@lang="fi"]')).isPresent()).toBe(true);
  });

  it('should switch to Finnish', async () => {
    await utils.setLang('fi');
    expect(element(by.xpath('//h1[.="Verkkotunnus"]')).isPresent()).toBe(true);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('fi');
  });
});
