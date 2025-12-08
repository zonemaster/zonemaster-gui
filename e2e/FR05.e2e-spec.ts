import { test, expect } from './global-setup';

import { goToHome, setLang } from './utils/app.utils';

test.describe('Zonemaster test FR05 - [Supports internationalization]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
  });

  const testSuite = [
      { language: 'Danish', code: 'da', expected: 'Domæne' },
      { language: 'English', code: 'en', expected: 'Domain name' },
      { language: 'Spanish', code: 'es', expected: 'Dominio' },
      { language: 'Finnish', code: 'fi', expected: 'Verkkotunnus' },
      { language: 'French', code: 'fr', expected: 'Domaine' },
      { language: 'Norwegian', code: 'nb', expected: 'Domenenavn' },
      { language: 'Swedish', code: 'sv', expected: 'Domänamn' },
  ];

  for (const { language, code, expected } of testSuite) {
    test(`should have ${language} language option`, async ({ page }) => {
      const langNavLink = page.locator(`select#languageSwitcher > option[lang="${code}"]`);
      await expect(langNavLink).toHaveCount(1);
      await expect(langNavLink).toHaveAttribute('lang', code);
    })

    test(`should switch to ${language}`, async ({ page }) => {
      await setLang(page, code);
        await expect(page.locator('input[name="domain"]')).toHaveAttribute('placeholder', expected);
    })
  }
});
