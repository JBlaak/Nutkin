import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {App} from '../ui/app';
import {ComponentType} from 'react';
import {FormPresenter} from './app/form_presenter';
import {ListPresenter} from './app/list_presenter';
import {FooterPresenter} from './app/footer_presenter';
import {TodoInteractor} from '../business/todo_interactor';
import {BehaviorSubject} from 'rxjs';

export class AppScene implements Scene, ViewProvidingScene<AppScene> {
    private activeFilter = new BehaviorSubject(TodoFilter.All);

    public form = new FormPresenter(this.todoInteractor);
    public list = new ListPresenter(this.todoInteractor, this.activeFilter);
    public footer = new FooterPresenter(this.todoInteractor, this.setActiveFilter.bind(this));

    constructor(private todoInteractor: TodoInteractor) {}

    public getView(): ComponentType<{scene: AppScene}> {
        return App;
    }

    public onStart(): void {
        this.form.onStart();
        this.list.onStart();
        this.footer.onStart();
    }

    public onStop(): void {
        this.form.onStop();
        this.list.onStop();
        this.footer.onStop();
    }

    public onDestroy(): void {
        this.form.onDestroy();
        this.footer.onDestroy();
    }

    private setActiveFilter(todoFilter: TodoFilter) {
        this.activeFilter.next(todoFilter);
    }
}

export enum TodoFilter {
    All,
    Active,
    Completed,
}
