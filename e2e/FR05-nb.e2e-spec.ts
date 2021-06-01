import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR05-nb - [Supports Norwegian language]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have Norwegian language button', () => {
    expect(element(by.xpath('//a[@lang="nb"]')).isPresent()).toBe(true);
  });

  it('should switch to Norwegian', () => {
    utils.setLang('nb');
    expect(element(by.xpath('//h1[.="Domenenavn"]')).isPresent()).toBe(true);
  });
});

