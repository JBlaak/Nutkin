import {FooterPresenter} from '../footer_presenter';
import {TestTodoInteractor} from '../../../business/test_todo_interactor';
import {TodoFilter} from '../../app_scene';

describe('FooterPresenter', () => {
    describe('onFilterButtonClick', () => {
        it('should broadcast newly set filter', () => {
            /* Given */
            let activeFilter: TodoFilter | null = null;
            const footerPresenter = new FooterPresenter(new TestTodoInteractor(), filter => (activeFilter = filter));

            /* When */
            footerPresenter.onFilterButtonClick(TodoFilter.Completed);

            /* Then */
            expect(activeFilter).toBe(TodoFilter.Completed);
        });
    });

    describe('onClearCompletedClick', () => {
        it('should call destroyCompleted on todo interactor', () => {
            /* Given */
            let activeFilter: TodoFilter | null = null;
            const testTodoInteractor = new TestTodoInteractor();
            const footerPresenter = new FooterPresenter(testTodoInteractor, filter => (activeFilter = filter));

            /* When */
            footerPresenter.onClearCompletedClick();

            /* Then */
            expect(testTodoInteractor.destroyCompletedCalled).toBe(true);
        });
    });
});
