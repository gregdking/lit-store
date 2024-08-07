import { type Action } from './action';
import { type Context } from './context';
import { type Effector, type Effect } from './effect';
import { type Selector, type Select } from './select';
import { type Updater, type Update } from './update';

export type SelectDomain<Tstate, Tdomain> = (state: Tstate) => Tdomain;

export type MergeDomain<Tstate, Tdomain> = (state: Tstate, domain: Tdomain) => Tstate;

export class Subdomain<Tstate, Tdomain> {
    static dispatcher<Tstate>(
        ...subdomains: Array<Subdomain<Tstate, any>>
    ): (actionName: string, payload: any, stateContext: Context<Tstate>) => Promise<void> {
        return async <Tpayload>(
            actionName: string,
            payload: Tpayload,
            stateContext: Context<Tstate>
        ) => {
            await Promise.all(
                subdomains.map(async (subdomain) =>
                    subdomain.dispatch(actionName, payload, stateContext)
                )
            );
        };
    }

    constructor(
        private readonly selectDomain: SelectDomain<Tstate, Tdomain>,
        private readonly mergeDomain: MergeDomain<Tstate, Tdomain>,
        private readonly actions: Record<string, Action<Tdomain, any>>
    ) {}

    async dispatch<Tpayload>(
        actionName: string,
        payload: Tpayload,
        stateContext: Context<Tstate>
    ): Promise<void> {
        const action = this.actions[actionName];
        if (!action) return;
        await action(this.newDomainContext(stateContext), payload);
    }

    private newDomainContext(context: Context<Tstate>): Context<Tdomain> {
        return {
            select: this.newSelect(context),
            update: this.newUpdate(context),
            effect: this.newEffect(context)
        };
    }

    private newSelect({ select }: Context<Tstate>): Select<Tdomain> {
        return <Tresult>(selector: Selector<Tdomain, Tresult>) => {
            const domain = select(this.selectDomain);
            return selector(domain);
        };
    }

    private newUpdate({ select, update }: Context<Tstate>): Update<Tdomain> {
        return (updater: Updater<Tdomain>) => {
            update((state) => {
                const domain = select(this.selectDomain);
                const newDomain = { ...domain, ...updater(domain) };
                return this.mergeDomain(state, newDomain);
            });
        };
    }

    private newEffect({ select }: Context<Tstate>): Effect<Tdomain> {
        return async (effector: Effector<Tdomain>) => {
            const domain = select(this.selectDomain);
            return effector(domain);
        };
    }

    select<Tresult>(selector: Selector<Tdomain, Tresult>, { select }: Context<Tstate>): Tresult {
        return select((state) => selector(this.selectDomain(state)));
    }
}
