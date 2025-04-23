type ClientInfo = {
    version: string;
    id: string;
};

type Config = {
    apiBaseUrl: string;
    clientInfo: ClientInfo;
};

const config: Config = {
    apiBaseUrl:
        import.meta.env.PUBLIC_API_URL ||
        (window as any)?.zmApiEndpoint ||
        '/api',
    clientInfo: {
        version: '5.0.0',
        id: 'Zonemaster-GUI',
    },
};

export default config;
