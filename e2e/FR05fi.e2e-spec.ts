import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05fi - [Supports Finnish language]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have Finnish language button', () => {
    expect(element(by.xpath('//a[@lang="fi"]')).isPresent()).toBe(true);
  });

  it('should switch to Finnish', () => {
    utils.setLang('fi');
    expect(element(by.xpath('//h1[.="Verkkotunnus"]')).isPresent()).toBe(true);
  });
});

