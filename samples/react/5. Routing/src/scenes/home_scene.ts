import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {HomeComponent} from '../ui/home';
import {ComponentType} from 'react';

export class HomeScene implements Scene, ViewProvidingScene<HomeScene> {
    constructor(private listener: HomeEvents) {}

    public getView(): ComponentType<{scene: HomeScene}> {
        return HomeComponent;
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

    public onUserClick(userId: number) {
        this.listener.onUserClick(userId);
    }

    public onContactClick() {
        this.listener.onContactClick();
    }
}

export interface HomeEvents {
    onUserClick(userId: number): void;
    onContactClick(): void;
}
