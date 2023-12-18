import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  testMatch: 'e2e/*.e2e-spec.ts',
  webServer: {
    command: 'ng build --configuration=tests --localize && node scripts/create_manifest.js && ZONEMASTER_GUI_CONFIG_FILE=e2e/zonemaster-gui.test.toml plackup ./scripts/zonemaster-gui --port 4201 --access-log zonemaster-gui.test.log',
    port: 4201,
    reuseExistingServer: true,
  },
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
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
