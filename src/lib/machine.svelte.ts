import TestAgent from '@/lib/TestAgent.ts';

export const machine = $state({
    currentState: TestAgent.getState(),
    currentContext: TestAgent.getContext(),
});

$effect.root(() => {
    $effect(() => {
        return TestAgent.subscribe((s, c) => {
            machine.currentState = s;
            machine.currentContext = c;
        });
    });
});

export function transition(event: string, payload?: any): void {
    TestAgent.transition(event, payload);
}
