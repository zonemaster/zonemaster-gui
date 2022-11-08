const { test, expect } = require('@playwright/test');

import { goToHome, setLang } from './utils/app.utils';

test.describe('Navigation should be consistent and honor browser behaviour', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('ensure navigation to result page is consistent - #300',  async ({ page, baseURL}) => {
    const domainCheckUrl = baseURL + '/check';
    const firstTestUrl = baseURL + '/result/226f6d4f44ae3f80';
    const secondTestUrl = baseURL + '/result/a0fbcbf6c5ff5842';
    const firstDomain = 'results.afNiC.Fr';
    const secondDomain = 'empty-results.afNiC.Fr';

    // Create a new test
    await expect(page).toHaveURL(domainCheckUrl);
    await page.locator('#input_domain_form').type(firstDomain);
    await page.locator('div button.launch').click();
    // Verify that when the test finishes the browser is redirect to the result page with an url /result/<id1>.
    // The domain check form is visible.
    await expect(page.locator('.result-header > h2')).toHaveText(firstDomain.toLowerCase(), { timeout: 10000 });
    await expect(page.locator('div.result.container')).toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    await expect(page).toHaveURL(firstTestUrl);
    // Press the back button in the browser.
    await page.goBack()
    // Verify that only the domain check form is displayed. The url should be /domain_check.
    await expect(page).toHaveURL(domainCheckUrl);
    await expect(page.locator('div.result.container')).not.toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    // Press the forward button in the browser.
    await page.goForward();
    // Verify that the previous test result is displayed with the url /result/<id1>.
    // The domain check form should still be visible.
    await expect(page.locator('.result-header > h2')).toHaveText(firstDomain.toLowerCase(), { timeout: 10000 });
    await expect(page.locator('div.result.container')).toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    await expect(page).toHaveURL(firstTestUrl);
    // Create a second test for an other domain from the result page.
    await page.locator('#input_domain_form').type(secondDomain);
    await page.locator('div button.launch').click();
    // When the second test finishes the url should change to /result/<id2>.
    // The result for the second test should be displayed and the domain check form should still be visible.
    await expect(page.locator('.result-header > h2')).toHaveText(secondDomain.toLowerCase(), { timeout: 10000 });
    await expect(page.locator('div.result.container')).toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    await expect(page).toHaveURL(secondTestUrl);
    // Refresh the page.
    await page.reload();
    // The domain check form is not visible, instead a Result header is displayed.
    await expect(page.locator('h1')).toHaveText('Result');
    await expect(page.locator('div.result.container')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.result-header > h2')).toHaveText(secondDomain.toLowerCase());
    await expect(page.locator('form.domain')).not.toBeVisible();
  });
});
