import { test as base } from '@playwright/test';
import { setupApiMocks } from './utils/app.utils';

/**
 * Global test setup that runs before each test
 * - Sets up API mocking to avoid needing a real backend
 * - Waits for network to be idle before proceeding
 */
export const test = base.extend({
    page: async ({ page }, use) => {
        // Setup API mocks for all tests
        await setupApiMocks(page);

        // Use the page in the test
        await use(page);
    },
});

export { expect } from '@playwright/test';
