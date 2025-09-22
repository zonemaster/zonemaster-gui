import { startDomainTest, testProgress } from '@/lib/client.js';
import StateMachine from '@/lib/StateMachine.ts';
import config from '@/config.ts';
import type { ValidationError } from '@/types.ts';

type DomainTestContext = {
    domain: string | null;
    testId: string | null;
    progress: number;
    error?:
        | {
              message: string;
              code: string;
              data?: ValidationError[];
          }
        | false;
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
                        context.domain = data.domain;
                        context.error = false;

                        startDomainTest(data)
                            .then((testId) => {
                                context.testId = testId;
                                TestAgent.transition('PROGRESS', {
                                    progress: 0,
                                });
                            })
                            .catch((error) => {
                                context.error = error;

                                TestAgent.transition('ERROR', error);
                            });
                    },
                },
            },
            testing: {
                on: {
                    PROGRESS: 'testing',
                    COMPLETE: 'complete',
                    ERROR: 'idle',
                },
                actions: {
                    PROGRESS: (context, payload) => {
                        context.progress = payload.progress;

                        document.title = config.setTitle(
                            `${payload.progress}% ${context.domain}`,
                        );

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
                            }, config.pollingInterval);
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
