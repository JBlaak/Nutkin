import * as React from 'react';
import {classNames} from '../support/classnames';
import {ItemPresenter} from '../../scenes/app/item_presenter';
import {useObservable} from '../support/use_observable';

interface OwnProps {
    presenter: ItemPresenter;
}

export const Item = ({presenter}: OwnProps) => {
    const todo = useObservable(presenter.todo, null);
    if (!todo) {
        return null;
    }

    return (
        <li
            className={classNames({
                completed: todo.completed,
            })}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={presenter.onToggleChange.bind(presenter)}
                />
                <label>{todo.title}</label>
                <button className="destroy" onClick={presenter.onDestroyClick.bind(presenter)} />
            </div>
        </li>
    );
};
