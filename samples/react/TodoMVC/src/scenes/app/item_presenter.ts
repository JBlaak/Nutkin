import {Scene} from '../../../../../../src/nutkin';
import {Todo} from '../../models/todo';
import {TodoInteractor} from '../../business/todo_interactor';
import {map} from 'rxjs/operators';

export class ItemPresenter implements Scene {
    public todo = this.todoInteractor.todos.pipe(map(todos => todos.find(todo => todo.id === this._todo.id)));

    constructor(private _todo: Todo, private todoInteractor: TodoInteractor) {}

    public onStart(): void {
        /* noop */
    }

    public onStop(): void {
        /* noop */
    }

    public onDestroy(): void {
        /* noop */
    }

    public onToggleChange() {
        this.todoInteractor.toggle(this._todo.id);
    }

    public onDestroyClick() {
        this.todoInteractor.destroy(this._todo.id);
    }
}
