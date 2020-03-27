import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR08 - [Presence of a default fallback language - English]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should have a fallback language - English', () => {
    expect(element(by.xpath('//h1[.="Domain name"]')).isPresent()).toBe(true);
  });
});
