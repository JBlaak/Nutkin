import {Scene} from '../../../../../../src/nutkin';
import {Observable} from 'rxjs';
import {TodoInteractor} from '../../business/todo_interactor';
import {map} from 'rxjs/operators';
import {TodoFilter} from '../app_scene';

export class FooterPresenter implements Scene {
    public visible: Observable<boolean> = this.todoInteractor.todos.pipe(map(todos => todos.length > 0));

    public incompleteCount: Observable<number> = this.todoInteractor.todos.pipe(
        map(todos => todos.filter(todo => !todo.completed)),
        map(todos => todos.length),
    );

    public clearCompletedButtonVisible: Observable<boolean> = this.todoInteractor.todos.pipe(
        map(todos => todos.filter(todo => todo.completed)),
        map(todos => todos.length > 0),
    );

    constructor(private todoInteractor: TodoInteractor, private setActiveFilter: (todoFilter: TodoFilter) => void) {}

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }

    public onClearCompletedClick() {
        this.todoInteractor.destroyCompleted();
    }

    public onFilterButtonClick(todoFilter: TodoFilter) {
        this.setActiveFilter(todoFilter);
    }
}
