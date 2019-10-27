import { by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test GR08 - [The advanced view should support the possibility of choosing a profile from multiple profiles]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should have an Select Form with at least one choose (default)', () => {
    const selectFrom = element(by.css('select[name="form.profile"]'));
    expect(selectFrom.isPresent()).toBe(true);
    expect(selectFrom.all(by.tagName('option')).count()).toBeGreaterThan(0);
    expect(selectFrom.all(by.tagName('option')).get(0).getAttribute('value')).toEqual('default');
  });
});
