import baseConfig from '../config.ts';

const config = baseConfig;

export function setApiBaseUrl(url: string) {
    config.apiBaseUrl = url;
}

export function setPollingInterval(url: number) {
    config.pollingInterval = url;
}

export default config;
