import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  testMatch: 'e2e/*21.e2e-spec.ts',
  webServer: {
    command: 'npm run ng serve -- --configuration=tests --port=4201',
    port: 4201,
    reuseExistingServer: true,
  },
  expect: {
    toMatchSnapshot: {
      threshold: 0.1,
    },
  },
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'http://localhost:4201',
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'chromium',
      ...devices['Desktop Chrome'],
    }
  ]
};
export default config;
