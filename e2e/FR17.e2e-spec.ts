import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR17 - [Able to specify delegation parameters]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
    await utils.setLang('en');
    await utils.activeOptions();
  });

  it('should be have one ns and digest form', () => {
    expect(element.all(by.css('div[formArrayName] .form-row')).count()).toEqual(2);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(1);
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(1);
  });

  it('should be have two ns and one digest form', () => {
    element.all(by.css('div[formArrayName="nameservers"] .form-row:first-child .btn.add')).click();
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(2);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(1);
  });

  it('should be have two ns and two digest form', () => {
    element.all(by.css('div[formArrayName="ds_info"] .form-row:first-child .btn.add')).click();
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(2);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(2);
  });


  it('should be have one ns and two digest form', () => {
    element.all(by.css('div[formArrayName="nameservers"] .form-row:first-child .btn.delete')).click();
    expect(element.all(by.css('input[formControlName="ns"')).count()).toEqual(1);
    expect(element.all(by.css('input[formControlName="keytag"')).count()).toEqual(2);
  });
});
