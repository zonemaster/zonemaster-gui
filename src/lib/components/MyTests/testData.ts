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
        id: '3117670a97a66d75',
        domain: 'zonemaster.net',
        date: '2026-10-14',
        type: 'single',
        status: 'finished',
    },
    {
        id: 'B-e5a8d73f4c1290ba',
        domain: 'my-batch-test-01',
        date: '2026-10-13',
        type: 'batch',
        status: 'finished',
        tests: [
            { id: '3117670a97a66d75', domain: 'example.com', date: '2026-10-13', status: 'finished' },
            { id: '3117670a97a66d75', domain: 'example.net', date: '2026-10-13', status: 'finished' },
            { id: '3117670a97a66d75', domain: 'example.org', date: '2026-10-13', status: 'finished' },
        ],
    },
    {
        id: '3117670a97a66d75',
        domain: 'internetstiftelsen.se',
        date: '2026-10-12',
        type: 'single',
        status: 'finished',
    },
    {
        id: 'B-2b94ef6c7d1830a5',
        domain: 'my-batch-test-02',
        date: '2026-10-11',
        type: 'batch',
        status: 'finished',
        tests: [
            { id: '3117670a97a66d75', domain: 'example.edu', date: '2026-10-11', status: 'finished' },
            { id: '3117670a97a66d75', domain: 'example.info', date: '2026-10-11', status: 'finished' },
        ],
    },
    {
        id: '3117670a97a66d75',
        domain: 'failed-single.example',
        date: '2026-10-10',
        type: 'single',
        status: 'failed',
    },
    {
        id: 'B-6f19ab42cde78053',
        domain: 'my-batch-test-03',
        date: '2026-10-09',
        type: 'batch',
        status: 'failed',
        tests: [
            { id: '3117670a97a66d75', domain: 'failed-batch.example', date: '2026-10-09', status: 'failed' },
            { id: '3117670a97a66d75', domain: 'completed-batch.example', date: '2026-10-09', status: 'finished' },
        ],
    },
];

export const batchTests = tests.filter((test) => test.type === 'batch');
