import { updateAction } from '../../lit-store/action';

export interface State {
    byKey: Record<TodoKey, Todo>;
    completed: TodoKey[];
    nextKey: number;
}

export type TodoKey = number;

export interface Todo {
    key: TodoKey;
    text: string;
}

export const initialState: State = {
    byKey: {},
    completed: [],
    nextKey: 0
};

const todoAdd = updateAction((state: State, { text }: { text: string }) => {
    const key = state.nextKey;
    const newTodo = { key, text };
    return {
        nextKey: key + 1,
        byKey: {
            ...state.byKey,
            [key]: newTodo
        }
    };
});

const todoComplete = updateAction((state: State, { key }: { key: TodoKey }) => {
    return {
        completed: [...state.completed, key]
    };
});

const todoRemove = updateAction((state: State, { key }: { key: TodoKey }) => {
    const byKey = { ...state.byKey };
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete byKey[key];
    return { byKey };
});

export const actions = { todoAdd, todoComplete, todoRemove };
