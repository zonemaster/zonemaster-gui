import { createTestAgent } from '@/lib/TestAgent.ts';

const agent = createTestAgent();

export const machine = $state({
    currentState: agent.getState(),
    currentContext: agent.getContext(),
    previousState: agent.getPreviousState(),
});

$effect.root(() => {
    $effect(() => {
        return agent.subscribe((s, c, p) => {
            machine.currentState = s;
            machine.currentContext = c;
            machine.previousState = p;
        });
    });
});

export function transition(event: string, payload?: any): void {
    agent.transition(event, payload);
}
