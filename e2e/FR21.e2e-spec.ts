const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions, clearBrowserCache } from './utils/app.utils';

test.describe.serial('Zonemaster test FR21 - [Able to provide a summarized result of the test being run ' +
  '(possibility in different colours for error, warning, success etc.)]', () => {

  let page;

  // Keep the same page between tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToHome(page);
    await setLang(page, 'en');
    await clearBrowserCache(page);
    await showOptions(page);
  });

  test('should display summary',  async () => {
    await expect(page.locator('.progress-bar')).toBeHidden();
    await page.locator('#input_domain_form').type('results.afNiC.Fr');
    await page.locator('div button.launch').click();

    await expect(page.locator('div.result.container')).toBeVisible({ timeout: 10000 });

    const messageCountBadges = page.locator('.nav.nav-pills.vertical-align.filter > li > a');
    const expectedLabels = ['All', 'Info', 'Notice', 'Warning', 'Error', 'Critical'];

    await expect(messageCountBadges).toHaveCount(6);

    for (const idx in expectedLabels) {
      await expect(messageCountBadges.nth(idx)).toContainText(expectedLabels[idx]);
    }
  });

  test('should display number of each level',  async () => {
    const expectedCounts = ['123', '118', '4', '0', '1', '0'];
    const messageCountBadges = page.locator('.nav.nav-pills.vertical-align.filter > li > a > span.badge');

    for (const idx in expectedCounts) {
      await expect(messageCountBadges.nth(idx)).toHaveText(expectedCounts[idx]);
    }
  });

  test('should display summary with good colors',  async () => {
    const filterButtons = page.locator('.nav.nav-pills.vertical-align.filter > li > a');

    for (const idx of [1, 2, 3, 4, 5]) {
      await filterButtons.nth(idx).click();
    }

    // wait for .2 second (color transition)
    await page.waitForTimeout(200);


    expect(await page.screenshot()).toMatchSnapshot('results.png');
  });
});
