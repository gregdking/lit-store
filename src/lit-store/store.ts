import { type Action } from './action';
import { type Context } from './context';
import { type Dispatch } from './dispatch';
import { type Effect, type Effector } from './effect';
import { type Select, type Selector } from './select';
import { type Subscription } from './subscription';
import { type Update, type Updater } from './update';

export class Store<Tstate> {
    public readonly dispatch: Dispatch<Tstate> = async (action, payload) =>
        this.dispatchAction(action, payload);

    private readonly subscriptions: Array<Subscription<Tstate>> = [];

    constructor(private state: Tstate) {}

    subscribe(subscription: Subscription<Tstate>): void {
        this.subscriptions.push(subscription);
        subscription(this.state);
    }

    async dispatchAction<Tpayload = undefined>(
        action: Action<Tstate, Tpayload>,
        payload: Tpayload
    ): Promise<void> {
        await action(this.newContext(), payload);
    }

    private newContext(): Context<Tstate> {
        return {
            select: this.newSelect(),
            update: this.newUpdate(),
            effect: this.newEffect()
        };
    }

    private newSelect(): Select<Tstate> {
        return <Tresult>(selector: Selector<Tstate, Tresult>) => selector(this.state);
    }

    private newUpdate(): Update<Tstate> {
        return (updater: Updater<Tstate>) => {
            const newState = { ...this.state, ...updater(this.state) };
            this.setState(newState);
        };
    }

    private setState(state: Tstate): void {
        if (this.state === state) return;
        this.state = state;
        this.publish();
    }

    private publish(): void {
        for (const subscription of this.subscriptions) {
            subscription(this.state);
        }
    }

    private newEffect(): Effect<Tstate> {
        return async (effector: Effector<Tstate>) => effector(this.state);
    }
}
