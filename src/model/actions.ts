import { type Action } from '../lit-store/action';
import { Subdomain } from '../lit-store/subdomain';
import * as ui from './modules/ui';
import { type State } from './state';
import { todoDomain, uiDomain } from './subdomains';

const dispatch = Subdomain.dispatcher(todoDomain, uiDomain);

export const textUpdate: Action<State, { text: string }> = async (context, payload) => {
    await dispatch('textUpdate', payload, context);
};

export const todoAdd: Action<State> = async (context) => {
    const text = uiDomain.select(ui.selectText, context);
    await dispatch('todoAdd', { text }, context);
};
