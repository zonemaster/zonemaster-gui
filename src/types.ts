declare global {
    interface Window {
        zonemaster?: {
            apiEndpoint?: string;
            pollingInterval?: number;
        };
    }
}

export type ClientInfo = {
    version: string;
    id: string;
};

export type SiteInfo = {
    siteName: string;
    email: string;
};

export type Config = {
    defaultLanguage: string;
    enabledLanguages: string[];
    apiBaseUrl: string;
    pollingInterval: number;
    clientInfo: ClientInfo;
    siteInfo: SiteInfo;
    setTitle(title: string): string;
};

export type ValidationError = { message: string; path: string };
