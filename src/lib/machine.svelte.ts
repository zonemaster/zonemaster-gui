import { createTestAgent } from '@/lib/TestAgent.ts';

const agent = createTestAgent();

export const machine = $state({
    currentState: agent.getState(),
    currentContext: agent.getContext(),
});

$effect.root(() => {
    $effect(() => {
        return agent.subscribe((s, c) => {
            machine.currentState = s;
            machine.currentContext = c;
        });
    });
});

export function transition(event: string, payload?: any): void {
    agent.transition(event, payload);
}
