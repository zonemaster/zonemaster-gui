const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Redirection should properly work', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('/ should redirect to /check', async ({ page, baseURL }) => {
    await page.goto( baseURL );
    await expect(page).toHaveURL( baseURL + '/en/check' );
  });

  test('/domain_check should redirect to /check', async ({ page, baseURL }) => {
    await page.goto( baseURL + '/domain_check' );
    await expect(page).toHaveURL( baseURL + '/en/check' );
  });

  test('/test/<test-id> should redirect to /result/<test-id>', async ({ page, baseURL }) => {
    const testID = '226f6d4f44ae3f80';

    await page.goto( baseURL + '/test/' + testID );
    await expect(page).toHaveURL( baseURL + '/en/result/' + testID );
  });
});
