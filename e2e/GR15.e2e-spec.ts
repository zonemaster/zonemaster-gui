import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR28 - Valid title for the Web interface', () => {
  const homePage = new Utils();
  describe('home page should work fine', () => {
    beforeAll(() => {
      homePage.goToHome();
    });

    it('should have right title - Zonemaster', () => {
      homePage.getPageTitle()
        .then((title: string) => {
          expect(title).toEqual('Zonemaster');
        });
    });
  });
});
