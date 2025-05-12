import { test, expect } from '@playwright/test';

import { goToHome, setLang } from './utils/app.utils';

test.describe('Navigation should be consistent and honor browser behaviour', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
  });

  test('ensure navigation to result page is consistent - #300',  async ({ page, baseURL}) => {
    const domainCheckUrl = baseURL + '/en/run-test';
    const firstTestUrl = baseURL + '/en/result/226f6d4f44ae3f80';
    const secondTestUrl = baseURL + '/en/result/a0fbcbf6c5ff5842';
    const firstDomain = 'results.afNiC.Fr';
    const secondDomain = 'empty-results.afNiC.Fr';

    // Create a new test
    await expect(page).toHaveURL(domainCheckUrl);
    await page.locator('#domain-input').type(firstDomain);
    await page.locator('button.launch').click();
    // Verify that when the test finishes the browser is redirect to the result page with an url /result/<id1>.
    // The "run domain test" form is visible.
    await expect(page.locator('section.result h2')).toContainText(firstDomain, { timeout: 10000 });
    await expect(page.locator('section.result')).toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    await expect(page).toHaveURL(firstTestUrl);
    // Press the back button in the browser.
    await page.goBack()
    // Verify that only the "run domain test" form is displayed. The url should be /run-test.
    await expect(page).toHaveURL(domainCheckUrl);
    await expect(page.locator('section.result')).not.toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    // Press the forward button in the browser.
    await page.goForward();
    // Verify that the previous test result is displayed with the url /result/<id1>.
    // The "run domain test" form should still be visible.
    await expect(page.locator('section.result h2')).toContainText(firstDomain, { timeout: 10000 });
    await expect(page.locator('section.result')).toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    await expect(page).toHaveURL(firstTestUrl);
    // Create a second test for an other domain from the result page.
    await page.locator('#domain-input').type(secondDomain);
    await page.locator('div button.launch').click();
    // When the second test finishes the url should change to /result/<id2>.
    // The result for the second test should be displayed and the "run domain test" form should still be visible.
    await expect(page.locator('section.result h2')).toContainText(secondDomain, { timeout: 10000 });
    await expect(page.locator('section.result')).toBeVisible();
    await expect(page.locator('form.domain')).toBeVisible();
    await expect(page).toHaveURL(secondTestUrl);
    // Refresh the page.
    await page.reload();
    // The "run domain test" form is not visible, instead a Result header is displayed.
    await expect(page.locator('h1')).toHaveText('Result');
    await expect(page.locator('section.result')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('section.result h2')).toContainText(secondDomain);
    await expect(page.locator('form.domain')).not.toBeVisible();
  });
});
