export type Selector<Tstate, Tresult> = (state: Tstate) => Tresult;

export type Select<Tstate> = <Tresult>(selector: Selector<Tstate, Tresult>) => Tresult;
