import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR17 - [Able to specify delegation parameters]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should be have one ns and digest form', () => {
    expect(element.all(by.css('div[formArrayName="itemRows"]')).count()).toEqual(2);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(1);
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(1);
  });

  it('should be have two ns and one digest form', () => {
    element.all(by.css('div[formArrayName="itemRows"]')).get(0).element(by.css('.btn.btn-success.add')).click();
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(2);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(1);
  });

  it('should be have two ns and two digest form', () => {
    element.all(by.css('div[formArrayName="itemRows"]')).get(1).element(by.css('.btn.btn-success.add')).click();
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(2);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(2);
  });


  it('should be have one ns and two digest form', () => {
    element.all(by.css('div[formArrayName="itemRows"]')).get(0).element(by.css('.btn.btn-danger.delete')).click();
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(1);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(2);
  });
});
