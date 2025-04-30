declare global {
    interface Window {
        zonemaster?: {
            apiEndpoint?: string;
            pollingInterval?: number;
        };
    }
}

type ClientInfo = {
    version: string;
    id: string;
};

export type Config = {
    defaultLanguage: string;
    enabledLanguages: string[];
    apiBaseUrl: string;
    pollingInterval: number;
    clientInfo: ClientInfo;
};

const config: Config = {
    defaultLanguage: 'en',
    enabledLanguages: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv'],
    apiBaseUrl: import.meta.env.PUBLIC_API_URL || '/api',
    pollingInterval: import.meta.env.PUBLIC_POLLING_INTERVAL || 5000,
    clientInfo: {
        version: '5.0.0',
        id: 'Zonemaster-GUI',
    },
};

export function setApiBaseUrl(url: string) {
    config.apiBaseUrl = url;
}

export function setPollingInterval(url: number) {
    config.pollingInterval = url;
}

export default config;
