import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-en - [Supports English language]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
  });

  it('should have English language button', () => {
    expect(element(by.xpath('//a[@lang="en"]')).isPresent()).toBe(true);
  });

  it('should switch to English', async () => {
    await utils.setLang('en');
    expect(element(by.xpath('//h1[.="Domain name"]')).isPresent()).toBe(true);
    const selectedLang = element.all(by.css('nav div.lang a.selected'));
    expect(selectedLang.count()).toBe(1);
    expect(selectedLang.first().getAttribute('lang')).toBe('en');
  });
});
