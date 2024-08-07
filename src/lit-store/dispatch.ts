import { type Action } from './action';

export type Dispatch<Tstate> = <Tpayload>(
    action: Action<Tstate, Tpayload>,
    payload: Tpayload
) => Promise<void>;
