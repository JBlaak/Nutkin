import {MvvmScene} from '../../../src/core/scenes/mvvm_scene';
import {ScreenOne} from './screen_one';
import {ComponentType} from 'react';
import {WithController} from '../../../src/react/mvvm/mvvm_view_factory';
import {MvvmViewProvidingScene} from '../../../src/react/mvvm/mvvm_view_providing_scene';

export class SceneOne extends MvvmScene<SceneOne> implements MvvmViewProvidingScene<SceneOne> {
    public foo: string;

    constructor(private listener: SceneOneEvents) {
        super();
        this.foo = 'Scene one!';
    }

    public getMvvmView(): ComponentType<WithController<SceneOne>> {
        return ScreenOne;
    }

    public onClick() {
        console.log('onClick scene one');
        this.listener.nextStep();
    }
}

export interface SceneOneEvents {
    nextStep(): void;
}
