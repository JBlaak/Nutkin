import {BehaviorSubject, Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {scan, shareReplay} from 'rxjs/operators';
import {TodoInteractor} from './todo_interactor';

export class DefaultTodoInteractor implements TodoInteractor {
    private events = new BehaviorSubject<Event>({event: EventType.Init});
    private index = 1;

    public todos: Observable<Todo[]> = this.events.pipe(
        scan(this.applyEvent, []),
        shareReplay(1),
    );

    public create(title: string): Todo {
        const todo = {
            id: this.index++,
            title: title,
            completed: false,
        };
        this.events.next({
            event: EventType.Create,
            todo: todo,
        });

        return todo;
    }

    public toggle(id: number): void {
        this.events.next({
            event: EventType.Toggle,
            id: id,
        });
    }

    public destroy(id: number): void {
        this.events.next({
            event: EventType.Destroy,
            id: id,
        });
    }

    public destroyCompleted(): void {
        this.events.next({
            event: EventType.DestroyCompleted,
        });
    }

    public toggleAll(): void {
        this.events.next({
            event: EventType.ToggleAll,
        });
    }

    private applyEvent(todos: Todo[], event: Event): Todo[] {
        switch (event.event) {
            case EventType.Init:
                return [];
            case EventType.ToggleAll:
                return todos.some(todo => !todo.completed)
                    ? todos.map(todo => ({...todo, completed: true}))
                    : todos.map(todo => ({...todo, completed: false}));
            case EventType.Toggle:
                return todos.map(todo => (todo.id === event.id ? {...todo, completed: !todo.completed} : todo));
            case EventType.Create:
                return [...todos, event.todo];
            case EventType.Destroy:
                return todos.filter(todo => todo.id !== event.id);
            case EventType.DestroyCompleted:
                return todos.filter(todo => !todo.completed);
        }
    }
}

type Event = Init | ToggleAll | Toggle | Create | Destroy | DestroyCompleted;

enum EventType {
    Init,
    Toggle,
    ToggleAll,
    Create,
    Destroy,
    DestroyCompleted,
}

interface Init {
    event: EventType.Init;
}

interface ToggleAll {
    event: EventType.ToggleAll;
}

interface Toggle {
    event: EventType.Toggle;
    id: number;
}

interface Create {
    event: EventType.Create;
    todo: Todo;
}

interface Destroy {
    event: EventType.Destroy;
    id: number;
}

interface DestroyCompleted {
    event: EventType.DestroyCompleted;
}
