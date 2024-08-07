import { Subdomain } from '../lit-store/subdomain';
import * as todo from './modules/todo';
import * as ui from './modules/ui';
import { type State } from './state';

export const uiDomain = new Subdomain<State, ui.State>(
    (state) => state.ui,
    (state, ui) => ({ ...state, ui }),
    ui.actions
);

export const todoDomain = new Subdomain<State, todo.State>(
    (state) => state.todo,
    (state, todo) => ({ ...state, todo }),
    todo.actions
);
