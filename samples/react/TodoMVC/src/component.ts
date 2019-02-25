import {TodoInteractor} from './business/todo_interactor';
import {DefaultTodoInteractor} from './business/default_todo_interactor';

export interface Component {
    todoInteractor: TodoInteractor;
}

export class DefaultComponent implements Component {
    private _todoInteractor: TodoInteractor | undefined;
    public get todoInteractor(): TodoInteractor {
        if (this._todoInteractor === undefined) {
            this._todoInteractor = new DefaultTodoInteractor();
        }
        return this._todoInteractor;
    }
}
