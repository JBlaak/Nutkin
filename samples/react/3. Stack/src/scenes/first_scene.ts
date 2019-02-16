import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {FirstComponent} from '../ui/first';
import {ComponentType} from 'react';

export class FirstScene implements Scene, ViewProvidingScene<FirstScene> {
    constructor(private listener: FirstSceneEvents) {}

    public getView(): ComponentType<{scene: FirstScene}> {
        return FirstComponent;
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
        this.listener.requestSecond();
    }
}

export interface FirstSceneEvents {
    requestSecond(): void;
}
