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

type Config = {
    apiBaseUrl: string;
    pollingInterval: number;
    clientInfo: ClientInfo;
};

const config: Config = {
    apiBaseUrl:
        import.meta.env.PUBLIC_API_URL ||
        window?.zonemaster?.apiEndpoint ||
        '/api',
    pollingInterval:
        import.meta.env.PUBLIC_POLLING_INTERVAL ||
        window?.zonemaster?.pollingInterval ||
        5000,
    clientInfo: {
        version: '5.0.0',
        id: 'Zonemaster-GUI',
    },
};

export default config;
