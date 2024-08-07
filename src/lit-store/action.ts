import { type Context } from './context';

export type Action<Tstate, Tpayload = undefined> = (
    context: Context<Tstate>,
    payload: Tpayload
) => Promise<void>;

export function updateAction<Tstate, Tpayload>(
    fn: (state: Tstate, payload: Tpayload) => Partial<Tstate>
): Action<Tstate, Tpayload> {
    return async (context: Context<Tstate>, payload: Tpayload) => {
        context.update((state) => fn(state, payload));
    };
}

export function sideEffect<Tstate, Tpayload>(
    fn: (state: Tstate, payload: Tpayload) => Promise<void>
): Action<Tstate, Tpayload> {
    return async (context: Context<Tstate>, payload: Tpayload) => {
        await context.effect(async (state) => {
            await fn(state, payload);
        });
    };
}
