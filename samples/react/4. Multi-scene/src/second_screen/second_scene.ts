import {MvvmScene} from '../../../../../src/core/scenes/mvvm_scene';
import {MvvmViewProvidingScene} from '../../../../../src/react/mvvm/mvvm_view_providing_scene';
import {WithController} from '../../../../../src/react/mvvm/mvvm_view_factory';
import {SecondScreen} from './second_screen';

export class SecondScene extends MvvmScene<SecondScene> implements MvvmViewProvidingScene<SecondScene> {
    constructor(public listener: SecondSceneEvents) {
        super();
    }

    public getMvvmView(): React.ComponentType<WithController<SecondScene>> {
        return SecondScreen;
    }

    public onClick() {
        this.listener.finishSecondScene();
    }
}

export interface SecondSceneEvents {
    finishSecondScene(): void;
}
