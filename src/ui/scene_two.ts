import {MvvmScene} from '../lib/core/scenes/mvvm_scene';
import {ComponentType} from 'react';
import {ScreenTwo} from './screen_two';
import {WithController} from '../lib/react/factories/mvvm_view_factory';

export class SceneTwo extends MvvmScene<SceneTwo> {
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

