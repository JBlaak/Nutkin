import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {ViewUserComponent} from '../ui/user';
import {ComponentType} from 'react';

export class ViewUserScene implements Scene, ViewProvidingScene<ViewUserScene> {
    constructor(public userId: number, private listener: ViewUserEvents) {}

    public getView(): ComponentType<{scene: ViewUserScene}> {
        return ViewUserComponent;
    }

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }

    public onClickBack() {
        this.listener.back();
    }
}

export interface ViewUserEvents {
    back(): void;
}
