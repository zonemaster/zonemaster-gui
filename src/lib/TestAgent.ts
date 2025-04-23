import { startDomainTest, testProgress } from '@/lib/client.js';
import StateMachine from '@/lib/StateMachine.ts';

type DomainTestContext = {
    domain: string | null;
    testId: string | null;
    progress: number;
};

export function createTestAgent() {
    const TestAgent = new StateMachine<DomainTestContext>({
        initial: 'idle',
        context: {
            domain: null,
            testId: null,
            progress: 0,
        },
        states: {
            idle: {
                on: { START: 'testing' },
                actions: {
                    START: (context, data) => {
                        startDomainTest(data).then((testId) => {
                            context.testId = testId;
                            TestAgent.transition('PROGRESS', { progress: 0 });
                        });
                    },
                },
            },
            testing: {
                on: { PROGRESS: 'testing', COMPLETE: 'complete' },
                actions: {
                    PROGRESS: (context, payload) => {
                        context.progress = payload.progress;

                        if (context.progress >= 100) {
                            TestAgent.transition('COMPLETE', { progress: 0 });
                        } else {
                            setTimeout(() => {
                                if (
                                    context.testId &&
                                    TestAgent.getState() === 'testing'
                                ) {
                                    testProgress(context.testId).then((res) => {
                                        TestAgent.transition('PROGRESS', {
                                            progress: res,
                                        });
                                    });
                                }
                            }, 1000);
                        }
                    },
                },
            },
            complete: {
                on: { RESET: 'idle' },
                actions: {
                    RESET: () => {
                        TestAgent.reset();
                    },
                },
            },
        },
    });

    return TestAgent;
}
