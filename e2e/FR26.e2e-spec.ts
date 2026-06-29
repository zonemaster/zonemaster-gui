import { test, expect } from './global-setup';

test.describe('Zonemaster test FR26 - [Shows results with empty testcases]', () => {
    test('shows a result with an empty testcase', async ({
        page,
    }) => {
        await page.goto('/en/result/empty-testcase-response/');

        await expect(page.locator('.zm-result')).toBeVisible({
            timeout: 10000,
        });
        await expect(
            page.getByRole('heading', {
                name: 'Test result for empty-testcase.example',
            }),
        ).toBeVisible();

        await page.getByRole('button', { name: 'Expand all modules' }).click();

        await expect(page.locator('#zmModule-Backend-content')).toContainText(
            'The backend returned a result without a testcase.',
        );
    });
});
