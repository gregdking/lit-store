export type Effector<Tstate> = (state: Tstate) => Promise<void>;

export type Effect<Tstate> = (effector: Effector<Tstate>) => Promise<void>;
