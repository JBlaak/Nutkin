import {KeyboardEvent} from 'react';
import {Scene} from '../../../../../../src/nutkin';
import {BehaviorSubject} from 'rxjs';
import {ChangeEvent, FormEvent} from 'react';
import {TodoInteractor} from '../../business/todo_interactor';

export class FormPresenter implements Scene {
    public value = new BehaviorSubject('');

    constructor(private todoInteractor: TodoInteractor) {}

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }

    public onChange(event: ChangeEvent<HTMLInputElement>) {
        this.value.next(event.target.value);
    }

    public onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            this.todoInteractor.create(this.value.value);
            this.value.next('');
        }
    }
}
