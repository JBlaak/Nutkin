import * as React from 'react';
import {FormPresenter} from '../../scenes/app/form_presenter';
import {useObservable} from '../support/use_observable';

interface OwnProps {
    presenter: FormPresenter;
}

export const Form = ({presenter}: OwnProps) => {
    const value = useObservable(presenter.value, '');

    return (
        <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            autoFocus={true}
            onChange={presenter.onChange.bind(presenter)}
            onKeyDown={presenter.onKeyDown.bind(presenter)}
        />
    );
};
