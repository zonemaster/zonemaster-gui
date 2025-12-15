import type { ResultDataResult, ResultLevel } from '@/lib/client.ts';

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
    baseUrl: string;
    apiBaseUrl: string;
    pollingInterval: number;
    clientInfo: ClientInfo;
    siteInfo: SiteInfo;
    setTitle(title: string): string;
};

export type ValidationError = { message: string; path: string };

export type Testcase = {
    id: string;
    level: ResultLevel;
    entries: ResultDataResult[];
};

export type ModuleBadge = {
    level: ResultLevel;
    count: number;
};

export type Module = {
    name: string;
    testcases: Testcase[];
    testcasesMap: Record<string, Testcase>;
};

export type ModuleSummary = Record<string, ModuleBadge[]>;

export type ResultFilter = {
    levels: Record<ResultLevel | 'ALL', boolean>;
    query: string;
};
