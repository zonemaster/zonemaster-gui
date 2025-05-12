import { test, expect } from '@playwright/test';

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR11 - [The simple view should look the same in latest version of different browsers]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('should match the domain page', async ({ page}) => {
    expect(await page.screenshot()).toMatchSnapshot('domain.png');
  });

  test('should not match the domain page', async({ page }) => {
    await showOptions(page);
    expect(await page.screenshot()).not.toMatchSnapshot('domain.png');
  });
});
