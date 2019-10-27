import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test GR01 - [Supports Swedish language]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have Swedish language button', () => {
    expect(element(by.xpath('//a[@lang="sv"]')).isPresent()).toBe(true);
  });

  it('should switch to Swedish', () => {
    utils.setLang('sv');
    expect(element(by.xpath('//h1[.="Domännamn"]')).isPresent()).toBe(true);
  });
});

