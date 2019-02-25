import * as React from 'react';
import {ListPresenter} from '../../scenes/app/list_presenter';
import {useObservable} from '../support/use_observable';
import {Item} from './item';

interface OwnProps {
    presenter: ListPresenter;
}

export const List = ({presenter}: OwnProps) => {
    const items = useObservable(presenter.items, []);
    const toggleAllChecked = useObservable(presenter.toggleAllChecked, false);

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={presenter.onToggleAllChange.bind(presenter)}
                checked={toggleAllChecked}
            />
            <label htmlFor="toggle-all" />
            <ul className="todo-list">
                {items.map((item, index) => (
                    <Item key={index} presenter={item} />
                ))}
            </ul>
        </section>
    );
};
