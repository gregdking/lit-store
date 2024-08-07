import { updateAction } from '../../lit-store/action';

export interface State {
    text: string;
    title: string;
}

export type Text = Pick<State, 'text'>;

export const initialState: State = {
    text: '',
    title: 'Todo List'
};

export const selectText = (state: State) => state.text;

export const selectTitle = (state: State) => state.title;

export const actions = {
    textUpdate: updateAction((_: State, { text }: Text) => ({ text })),
    todoAdd: updateAction((_: State) => ({ text: '' }))
};
