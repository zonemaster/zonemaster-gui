import { startDomainTest, testProgress } from '@/lib/client.js';
import StateMachine from '@/lib/StateMachine.ts';
import { navigate } from '@/lib/router.svelte.ts';

type DomainTestContext = {
  domain: string | null;
  testId: string | null;
  progress: number;
};

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
              if (context.testId && TestAgent.getState() === 'testing') {
                testProgress(context.testId).then((res) => {
                  TestAgent.transition('PROGRESS', { progress: res });
                });
              }
            }, 1000);
          }
        },
        COMPLETE: (context) => {
          navigate(`/result/${context.testId}`);

          TestAgent.transition('RESET');
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

export default TestAgent;
