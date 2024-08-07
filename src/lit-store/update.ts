export type Updater<Tstate> = (state: Tstate) => Partial<Tstate>;

export type Update<Tstate> = (updater: Updater<Tstate>) => void;
