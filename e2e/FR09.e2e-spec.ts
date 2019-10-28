import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR09 - [Once a language is chosen, all other links should open in that respective language]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('fr');
  });

  it('should keep french when opening faq page', async() => {
    await browser.wait(() => element(by.xpath('//h1[.="Nom de domaine"]')).isPresent(), 120 * 1000);
    await utils.goTo('faq');
    await browser.wait(() => element(by.css('div.container.faq > div > h1')).isPresent(), 120 * 1000);
    await expect(element(by.css('section.main > div > h1')).getText())
      .toBe('FAQ');
    await expect(element(by.css('div.container.faq > div > h1')).getText())
      .toBe('Zonemaster');
    await expect(element.all(by.css('div.container.faq > div > h4')).get(0).getText())
      .toEqual('1. Zonemaster c\'est quoi ?');
  });
});
