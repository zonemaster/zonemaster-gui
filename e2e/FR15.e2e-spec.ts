const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR15 - [The advanced view should look the same in latest version of different browsers]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should match the domain page with options on', async ({ page}) => {
    await showOptions(page);
    expect(await page.screenshot()).toMatchSnapshot('domain_with_options.png');
  });

  test('should not match the domain page with options off', async({ page }) => {
    expect(await page.screenshot()).not.toMatchSnapshot('domain_with_options.png');
  });
});
