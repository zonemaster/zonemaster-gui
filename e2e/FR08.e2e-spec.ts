import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR08 - [Presence of a default fallback language - English]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
    await utils.clearBrowserCache();
  });

  it('should have a fallback language - English', async () => {
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Domain name"]'))), 5 * 1000);
  });
});
