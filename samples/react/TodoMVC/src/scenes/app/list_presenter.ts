import {Scene} from '../../../../../../src/nutkin';
import {TodoInteractor} from '../../business/todo_interactor';
import {combineLatest, Observable} from 'rxjs';
import {Todo} from '../../models/todo';
import {map, share} from 'rxjs/operators';
import {ItemPresenter} from './item_presenter';
import {TodoFilter} from '../app_scene';

export class ListPresenter implements Scene {
    private todos: Observable<Todo[]> = combineLatest(this.todoInteractor.todos, this.activeFilter).pipe(
        map(([todos, activeFilter]) => {
            switch (activeFilter) {
                case TodoFilter.All:
                    return todos;
                case TodoFilter.Active:
                    return todos.filter(todo => !todo.completed);
                case TodoFilter.Completed:
                    return todos.filter(todo => todo.completed);
            }
        }),
        share(),
    );

    public items: Observable<ItemPresenter[]> = this.todos.pipe(
        map(todos => todos.map(todo => this.presenterForTodo(todo))),
        share(),
    );

    public toggleAllChecked = this.todos.pipe(map(todos => todos.some(todo => !todo.completed)));

    private presenters = new Map<number, ItemPresenter>();

    constructor(private todoInteractor: TodoInteractor, private activeFilter: Observable<TodoFilter>) {}

    public onStart(): void {
        this.presenters.forEach(presenter => presenter.onStart());
    }

    public onStop(): void {
        this.presenters.forEach(presenter => presenter.onStop());
    }

    public onDestroy(): void {
        this.presenters.forEach(presenter => presenter.onDestroy());
    }

    public onToggleAllChange() {
        this.todoInteractor.toggleAll();
    }

    private presenterForTodo(todo: Todo): ItemPresenter {
        if (!this.presenters.has(todo.id)) {
            const itemPresenter = new ItemPresenter(todo, this.todoInteractor);
            itemPresenter.onStart();
            this.presenters.set(todo.id, itemPresenter);
        }
        return this.presenters.get(todo.id)!;
    }
}
