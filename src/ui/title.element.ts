import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { selectTitle } from '../model/page';
import { type State } from '../model/state';

@customElement('store-title')
class Title extends LitElement {
    @property()
    value?: string;

    state!: State;

    render(): TemplateResult {
        const { value } = this.mapStateToProps();
        return html`<h1>${value}</h1>`;
    }

    mapStateToProps(): { value: string } {
        return {
            value: this.value ?? selectTitle(this.state)
        };
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface HTMLElementTagNameMap {
        'store-title': Title;
    }
}
