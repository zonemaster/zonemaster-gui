import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    workers: 4,
    testDir: 'e2e',
    testMatch: 'e2e/*.e2e-spec.ts',
    webServer: {
        command: 'NODE_ENV=testing npm run build && NODE_ENV=testing npm run preview',
        url: 'http://localhost:4321/',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI
    },
    expect: {
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.01
        }
    },
    use: {
        headless: true,
        baseURL: 'http://localhost:4321',
        viewport: { width: 1920, height: 1080 }
    },
    projects: [
        {
            name: 'chromium',
            ...devices['Desktop Chrome']
        },
    ],
    snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
};
export default config;
