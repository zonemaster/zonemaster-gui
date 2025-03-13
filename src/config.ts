type ClientInfo = {
    version: string;
    id: string;
};

type Config = {
    apiBaseUrl: string;
    clientInfo: ClientInfo;
};

const config: Config = {
    apiBaseUrl: import.meta.env.PUBLIC_API_URL,
    clientInfo: {
        version: '4.3.1',
        id: 'Zonemaster-GUI',
    },
};

export default config;
