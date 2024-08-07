import { type Effect } from './effect';
import { type Select } from './select';
import { type Update } from './update';

export interface Context<Tstate> {
    select: Select<Tstate>;
    update: Update<Tstate>;
    effect: Effect<Tstate>;
}
