import config from '@/config.ts';

type RpcParams = {
  [key: string]: any;
};

export async function rpc(
  method: string,
  params: RpcParams = {},
  guiInfo: boolean = true,
): Promise<any> {
  const id = Date.now();

  if (guiInfo) {
    params['client_version'] = config.clientInfo.version;
    params['client_id'] = config.clientInfo.id;
  }

  const data = {
    jsonrpc: '2.0',
    id,
    method,
    params,
  };

  const response = await fetch(config.apiBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.result;
}

export async function versionInfo(): Promise<any> {
  return rpc('version_info', {}, false);
}

export async function profileNames(): Promise<any> {
  return rpc('profile_names', {}, false);
}

export type Nameservers = {
  ns: string;
  ip?: string;
};

export type DSInfo = {
  digest: string;
  algorithm: number;
  digtype: number;
  keytag: number;
};

export type StartDomainTestData = {
  domain: string;
  ipv4?: boolean;
  ipv6?: boolean;
  nameservers?: Nameservers[];
  ds_info?: DSInfo[];
  profile?: string;
  client_id?: string;
  client_version?: string;
  priority?: number;
  queue?: number;
  language?: string;
};

export async function startDomainTest(
  data: StartDomainTestData,
): Promise<string> {
  return rpc('start_domain_test', data);
}

export type TestProgress = {
  result: number;
};

export async function testProgress(testId: string): Promise<number> {
  return rpc('test_progress', { test_id: testId }, false);
}
