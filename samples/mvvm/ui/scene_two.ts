import {MvvmScene} from '../../../src/core/scenes/mvvm_scene';
import {ComponentType} from 'react';
import {ScreenTwo} from './screen_two';
import {WithController} from '../../../src/react/mvvm/mvvm_view_factory';
import {MvvmViewProvidingScene} from '../../../src/react/mvvm/mvvm_view_providing_scene';

export class SceneTwo extends MvvmScene<SceneTwo> implements MvvmViewProvidingScene<SceneTwo> {
    public bar: string;

    constructor(private listener: SceneTwoEvents) {
        super();
        this.bar = 'Scene two!';
    }

    public getMvvmView(): ComponentType<WithController<SceneTwo>> {
        return ScreenTwo;
    }

    public onClick() {
        console.log('onClick scene two');
        this.listener.onMyOtherSceneBackClick();
    }
}

export interface SceneTwoEvents {
    onMyOtherSceneBackClick(): void;
}