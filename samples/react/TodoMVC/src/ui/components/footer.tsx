import * as React from 'react';
import {FooterPresenter} from '../../scenes/app/footer_presenter';
import {useObservable} from '../support/use_observable';
import {TodoFilter} from '../../scenes/app_scene';

interface OwnProps {
    presenter: FooterPresenter;
}

export const Footer = ({presenter}: OwnProps) => {
    const visible = useObservable(presenter.visible, null);
    const incompleteCount = useObservable(presenter.incompleteCount, null);
    const clearCompletedButtonVisible = useObservable(presenter.clearCompletedButtonVisible, false);

    if (!visible) {
        return null;
    }

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{incompleteCount}</strong> item(s) left
            </span>
            <ul className="filters">
                <li>
                    <a href="#/" onClick={() => presenter.onFilterButtonClick(TodoFilter.All)}>
                        All
                    </a>
                </li>
                <li>
                    <a href="#/active" onClick={() => presenter.onFilterButtonClick(TodoFilter.Active)}>
                        Active
                    </a>
                </li>
                <li>
                    <a href="#/completed" onClick={() => presenter.onFilterButtonClick(TodoFilter.Completed)}>
                        Completed
                    </a>
                </li>
            </ul>
            {clearCompletedButtonVisible ? (
                <button className="clear-completed" onClick={presenter.onClearCompletedClick.bind(presenter)}>
                    Clear completed
                </button>
            ) : null}
        </footer>
    );
};
