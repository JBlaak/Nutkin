import {MvvmScene} from '../lib/core/scenes/mvvm_scene';
import {ScreenOne} from './screen_one';
import {ComponentType} from 'react';
import {WithController} from '../lib/react/factories/mvvm_view_factory';

export class SceneOne extends MvvmScene<SceneOne> {
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
