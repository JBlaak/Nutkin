import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {SecondComponent} from '../ui/second';
import {ComponentType} from 'react';

export class SecondScene implements Scene, ViewProvidingScene<SecondScene> {
    constructor(private listener: SecondSceneEvents) {}

    public getView(): ComponentType<{scene: SecondScene}> {
        return SecondComponent;
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

    public onClick() {
        this.listener.back();
    }
}

export interface SecondSceneEvents {
    back(): void;
}
