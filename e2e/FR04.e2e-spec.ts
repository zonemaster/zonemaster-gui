import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR04 - Valid title for the Web interface', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
    await utils.setLang('en');
  });

  it('should have right title - Zonemaster', () => {
    utils.getPageTitle()
      .then((title: string) => {
        expect(title).toEqual('Zonemaster');
      });
  });
});
