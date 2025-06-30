type StateConfig<TContext> = {
    on?: Record<string, string>;
    actions?: Record<string, (context: TContext, payload?: any) => void>;
};

type FSMConfig<TContext> = {
    initial: string;
    context?: TContext;
    states: Record<string, StateConfig<TContext>>;
};

type TransitionCallback<TContext> = (
    state: string,
    context: TContext,
    prevState: string | undefined,
) => void;

export default class StateMachine<TContext> {
    private readonly states: Record<string, StateConfig<TContext>>;
    private currentState: string;
    private previousState?: string;
    public context: TContext;
    private subscribers: TransitionCallback<TContext>[] = [];
    public reset: () => void;

    constructor(config: FSMConfig<TContext>) {
        this.states = config.states;
        this.currentState = config.initial;
        this.previousState = undefined;
        this.context = { ...config.context } as TContext;

        this.reset = () => {
            this.currentState = config.initial;
            this.previousState = undefined;
            this.context = config.context || ({} as TContext);
            this.notifySubscribers();
        };
    }

    transition(event: string, payload?: any): void {
        const stateConfig = this.states[this.currentState];
        const nextState = stateConfig?.on?.[event];

        if (!nextState) {
            throw new Error(
                `Invalid transition: ${event} from ${this.currentState}`,
            );
        }

        console.log(`${this.currentState} -> ${nextState}`, payload);

        this.previousState = this.currentState;
        this.currentState = nextState;
        this.context = { ...this.context, ...payload } as TContext;

        if (stateConfig?.actions?.[event]) {
            stateConfig.actions[event](this.context, payload);
        }

        this.notifySubscribers();
    }

    getState(): string {
        return this.currentState;
    }

    getPreviousState(): string | undefined {
        return this.previousState;
    }

    getContext(): TContext {
        return this.context;
    }

    unsubscribe(callback: TransitionCallback<TContext>): void {
        const index = this.subscribers.indexOf(callback);

        if (index !== -1) {
            this.subscribers.splice(index, 1);
        }
    }

    subscribe(callback: TransitionCallback<TContext>): () => void {
        this.subscribers.push(callback);

        return () => this.unsubscribe(callback);
    }

    private notifySubscribers(): void {
        for (const callback of this.subscribers) {
            callback(this.currentState, this.context, this.previousState);
        }
    }
}
