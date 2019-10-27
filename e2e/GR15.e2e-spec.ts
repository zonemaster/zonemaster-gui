import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test GR15 - Valid title for the Web interface', () => {
  const utils = new Utils();
  describe('home page should work fine', () => {
    beforeAll(() => {
      utils.goToHome();
      utils.setLang('en');
    });

    it('should have right title - Zonemaster', () => {
      utils.getPageTitle()
        .then((title: string) => {
          expect(title).toEqual('Zonemaster');
        });
    });
  });
});
