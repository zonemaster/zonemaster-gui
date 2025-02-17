type StateConfig<TContext> = {
  on?: Record<string, string>;
  actions?: Record<string, (context: TContext, payload?: any) => void>;
};

type FSMConfig<TContext> = {
  initial: string;
  context?: TContext;
  states: Record<string, StateConfig<TContext>>;
};

type TransitionCallback<TContext> = (state: string, context: TContext) => void;

export default class StateMachine<TContext> {
  private readonly states: Record<string, StateConfig<TContext>>;
  private currentState: string;
  public context: TContext;
  private subscribers: TransitionCallback<TContext>[] = [];

  constructor(config: FSMConfig<TContext>) {
    this.states = config.states;
    this.currentState = config.initial;
    this.context = config.context || ({} as TContext);
  }

  transition(event: string, payload?: any): void {
    const stateConfig = this.states[this.currentState];
    const nextState = stateConfig?.on?.[event];

    if (!nextState) {
      throw new Error(`Invalid transition: ${event} from ${this.currentState}`);
    }

    this.currentState = nextState;

    if (stateConfig?.actions?.[event]) {
      stateConfig.actions[event](this.context, payload);
    }

    this.notifySubscribers();
  }

  getState(): string {
    return this.currentState;
  }

  getContext(): TContext {
    return this.context;
  }

  subscribe(callback: TransitionCallback<TContext>): void {
    this.subscribers.push(callback);
  }

  private notifySubscribers(): void {
    for (const callback of this.subscribers) {
      callback(this.currentState, this.context);
    }
  }
}
