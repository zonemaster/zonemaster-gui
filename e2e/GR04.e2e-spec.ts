import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR04 - [On launching the URL opens with a default simple view]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    element(by.xpath('//a[@lang="en"]')).click();
  });

  it('should have [Domain name] label visible', () => {
    expect(element(by.xpath('//h1[(.="Domain name")]')).isPresent()).toBe(true);
  });
  it('should have [Advanced options] label visible', () => {
    expect(element(by.xpath('//label[contains(., "Advanced options")]')).isPresent()).toBe(true);
  });
  it('should have [Nameservers label] NOT visible', () => {
    expect(element(by.xpath('//legend[contains(., "Nameservers")]')).isPresent()).toBe(false);
  });
  it('should have [Digests] NOT visible', () => {
    expect(element(by.xpath('//legend[contains(., "Digests")]')).isPresent()).toBe(false);
  });
});
