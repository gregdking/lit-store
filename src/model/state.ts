import * as todo from './modules/todo';
import * as ui from './modules/ui';

export interface State {
    todo: todo.State;
    ui: ui.State;
}

export const initialState: State = {
    todo: todo.initialState,
    ui: ui.initialState
};
