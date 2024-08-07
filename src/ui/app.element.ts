import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { type Dispatch } from '../lit-store/dispatch';
import { Store } from '../lit-store/store';
import { initialState, type State } from '../model/state';

@customElement('store-app')
class App extends LitElement {
    private readonly store: Store<State>;

    state: State;

    dispatch: Dispatch<State>;

    constructor() {
        super();
        this.state = initialState;
        this.store = new Store(this.state);
        this.dispatch = this.store.dispatch;
        this.store.subscribe((state) => {
            this.state = state;
        });
    }

    render(): TemplateResult {
        return html`<slot></slot>`;
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface HTMLElementTagNameMap {
        'store-app': App;
    }
}
