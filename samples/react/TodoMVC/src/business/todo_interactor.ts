import {Observable} from 'rxjs';
import {Todo} from '../models/todo';

export interface TodoInteractor {
    todos: Observable<Todo[]>;

    create(title: string): Todo;

    toggleAll(): void;

    toggle(id: number): void;

    destroy(id: number): void;

    destroyCompleted(): void;
}
