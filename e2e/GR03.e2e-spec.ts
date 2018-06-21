import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR03 - [Supports English language]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have English language button', () => {
    expect(element(by.xpath('//a[@lang="en"]')).isPresent()).toBe(true);
  });

  it('should switch to English', () => {
    element(by.xpath('//a[@lang="en"]')).click();
    expect(element(by.xpath('//h1[.="Domain name"]')).isPresent()).toBe(true);
  });
});
