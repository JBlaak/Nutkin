import {TodoInteractor} from './todo_interactor';
import {BehaviorSubject} from 'rxjs';
import {Todo} from '../models/todo';

export class TestTodoInteractor implements TodoInteractor {
    public destroyCompletedCalled: boolean = false;

    public todos = new BehaviorSubject([]);

    public create(title: string): Todo {
        throw new Error('create not implemented');
    }

    public destroy(id: number): void {
        throw new Error('destroy not implemented');
    }

    public destroyCompleted(): void {
        this.destroyCompletedCalled = true;
    }

    public toggle(id: number): void {
        throw new Error('toggle not implemented');
    }

    public toggleAll(): void {
        throw new Error('toggleAll not implemented');
    }
}
