export type SingleTest = {
    id: string;
    domain: string;
    date: string;
    status: 'finished' | 'failed';
};

export type Test = {
    id: string;
    domain: string;
    date: string;
    type: 'single' | 'batch';
    status: 'finished' | 'failed';
    tests?: SingleTest[];
};

export const tests: Test[] = [
    {
        id: '7294b2cfb1561823',
        domain: 'zonemaster.net',
        date: '2026-10-14',
        type: 'single',
        status: 'finished',
    },
    {
        id: 'B-e5a8d73f4c1290ba',
        domain: 'batch-test-01',
        date: '2026-10-13',
        type: 'batch',
        status: 'finished',
        tests: [
            { id: 'c18e4a907db5623f', domain: 'example.com', date: '2026-10-13', status: 'finished' },
            { id: '4f73bc8d1ea95062', domain: 'example.net', date: '2026-10-13', status: 'finished' },
            { id: '9a62edc5b80147f3', domain: 'example.org', date: '2026-10-13', status: 'finished' },
        ],
    },
    {
        id: 'd6c371f8a2049be5',
        domain: 'internetstiftelsen.se',
        date: '2026-10-12',
        type: 'single',
        status: 'finished',
    },
    {
        id: 'B-2b94ef6c7d1830a5',
        domain: 'batch-test-02',
        date: '2026-10-11',
        type: 'batch',
        status: 'finished',
        tests: [
            { id: '8de25b719c40fa63', domain: 'example.edu', date: '2026-10-11', status: 'finished' },
            { id: '37a6c9e1d4528fb0', domain: 'example.info', date: '2026-10-11', status: 'finished' },
        ],
    },
    {
        id: 'b04d8f3267ea159c',
        domain: 'failed-single.example',
        date: '2026-10-10',
        type: 'single',
        status: 'failed',
    },
    {
        id: 'B-6f19ab42cde78053',
        domain: 'batch-test-03',
        date: '2026-10-09',
        type: 'batch',
        status: 'failed',
        tests: [
            { id: '1c8a5e7db2094f36', domain: 'failed-batch.example', date: '2026-10-09', status: 'failed' },
            { id: 'f4372b8c6e1d950a', domain: 'completed-batch.example', date: '2026-10-09', status: 'finished' },
        ],
    },
];

export const batchTests = tests.filter((test) => test.type === 'batch');
