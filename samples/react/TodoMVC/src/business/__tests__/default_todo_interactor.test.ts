import {TodoInteractor} from '../todo_interactor';
import {Todo} from '../../models/todo';
import {DefaultTodoInteractor} from '../default_todo_interactor';
import {testObservable} from '../../__support__/test_observable';
import {TestObserver} from '../../__support__/test_observer';

describe('DefaultTodoInteractor', () => {
    let todoInteractor: TodoInteractor = new DefaultTodoInteractor();
    let testObserver: TestObserver<Todo[]>;

    beforeEach(() => {
        todoInteractor = new DefaultTodoInteractor();
        testObserver = testObservable(todoInteractor.todos);
    });

    afterEach(() => {
        testObserver.done();
    });

    it('should start with an empty list', () => {
        /* Then */
        expect(testObserver.values.length).toBe(1);
        expect(testObserver.lastValue).toEqual([]);
    });

    describe('create', () => {
        it('create should create a todo with correct title', () => {
            /* When */
            todoInteractor.create('Howdy');

            /* Then */
            expect(testObserver.values.length).toBe(2);
            expect(testObserver.lastValue!.length).toBe(1);
            expect(testObserver.lastValue![0].title).toBe('Howdy');
        });

        it('create should assign an ID to the created todo', () => {
            /* When */
            todoInteractor.create('Howdy');

            /* Then */
            expect(testObserver.values.length).toBe(2);
            expect(testObserver.lastValue!.length).toBe(1);
            expect(testObserver.lastValue![0].id).not.toBeNull();
            expect(testObserver.lastValue![0].id).not.toBeNaN();
        });

        it('second create should add an extra todo', () => {
            /* When */
            todoInteractor.create('Howdy');
            todoInteractor.create('Hi');

            /* Then */
            expect(testObserver.values.length).toBe(3);
            expect(testObserver.lastValue!.length).toBe(2);
            expect(testObserver.lastValue![0].title).toBe('Howdy');
            expect(testObserver.lastValue![1].title).toBe('Hi');
        });
    });

    describe('toggle', () => {
        it('should toggle single todo as completed', () => {
            /* Given */
            const todo = todoInteractor.create('Howdy');

            /* When */
            todoInteractor.toggle(todo.id);

            /* Then */
            expect(testObserver.lastValue![0].completed).toBe(true);
        });
        it('should toggle single todo to incomplete', () => {
            /* Given */
            const todo = todoInteractor.create('Howdy');

            /* When */
            todoInteractor.toggle(todo.id);
            todoInteractor.toggle(todo.id);

            /* Then */
            expect(testObserver.lastValue![0].completed).toBe(false);
        });
        it('should leave other todos alone', () => {
            /* Given */
            const todo = todoInteractor.create('Howdy');
            todoInteractor.create('Hi');

            /* When */
            todoInteractor.toggle(todo.id);

            /* Then */
            expect(testObserver.lastValue!.length).toBe(2);
            expect(testObserver.lastValue![0].completed).toBe(true);
            expect(testObserver.lastValue![1].completed).toBe(false);
        });
    });

    describe('toggleAll', () => {
        it('should have none completed without interaction', () => {
            /* Given */
            todoInteractor.create('Howdy');
            todoInteractor.create('Hi');

            /* Then */
            expect(testObserver.lastValue!.length).toBe(2);
            expect(testObserver.lastValue![0].completed).toBe(false);
            expect(testObserver.lastValue![1].completed).toBe(false);
        });
        it('should toggle all completed when none is completed', () => {
            /* Given */
            todoInteractor.create('Howdy');
            todoInteractor.create('Hi');

            /* When */
            todoInteractor.toggleAll();

            /* Then */
            expect(testObserver.lastValue!.length).toBe(2);
            expect(testObserver.lastValue![0].completed).toBe(true);
            expect(testObserver.lastValue![1].completed).toBe(true);
        });
        it('should toggle all incomplete when all are completed', () => {
            /* Given */
            todoInteractor.create('Howdy');
            todoInteractor.create('Hi');

            /* When */
            todoInteractor.toggleAll();
            todoInteractor.toggleAll();

            /* Then */
            expect(testObserver.lastValue!.length).toBe(2);
            expect(testObserver.lastValue![0].completed).toBe(false);
            expect(testObserver.lastValue![1].completed).toBe(false);
        });
    });

    describe('destroy', () => {
        it('should destroy a todo', () => {
            /* Given */
            const first = todoInteractor.create('Howdy');
            const second = todoInteractor.create('Hi');

            /* When */
            todoInteractor.destroy(first.id);

            /* Then */
            expect(testObserver.lastValue!.length).toBe(1);
            expect(testObserver.lastValue![0].id).toBe(second.id);
        });
    });

    describe('destroyCompleted', () => {
        it('should destroy all completed todos', () => {
            /* Given */
            const first = todoInteractor.create('Howdy');
            const second = todoInteractor.create('Hi');

            /* When */
            todoInteractor.toggle(first.id);
            todoInteractor.destroyCompleted();

            /* Then */
            expect(testObserver.lastValue!.length).toBe(1);
            expect(testObserver.lastValue![0].id).toBe(second.id);
        });
    });
});
