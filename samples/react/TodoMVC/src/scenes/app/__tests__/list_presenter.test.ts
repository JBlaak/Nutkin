import {ListPresenter} from '../list_presenter';
import {TestTodoInteractor} from '../../../business/test_todo_interactor';
import {BehaviorSubject} from 'rxjs';
import {TodoFilter} from '../../app_scene';
import {testObservable} from '../../../__support__/test_observable';

describe('ListPresenter', () => {
    describe('items', () => {
        it('should start with an empty list', () => {
            /* Given */
            const behaviorSubject = new BehaviorSubject(TodoFilter.All);
            const testTodoInteractor = new TestTodoInteractor();
            const listPresenter = new ListPresenter(testTodoInteractor, behaviorSubject);

            /* When */
            const testObserver = testObservable(listPresenter.items);

            /* Then */
            expect(testObserver.lastValue).toEqual([]);
        });
    });
});
