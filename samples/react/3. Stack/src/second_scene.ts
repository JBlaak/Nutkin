import {MvvmScene} from '../../../../src/core/scenes/mvvm_scene';
import {MvvmViewProvidingScene} from '../../../../src/react/mvvm/mvvm_view_providing_scene';
import {WithController} from '../../../../src/react/mvvm/mvvm_view_factory';
import {ViewTwo} from './view_two';

export class SecondScene extends MvvmScene<SecondScene> implements MvvmViewProvidingScene<SecondScene> {
    constructor(private listener: SecondSceneEvents) {
        super();
    }

    public getMvvmView(): React.ComponentType<WithController<SecondScene>> {
        return ViewTwo;
    }

    public onClick() {
        this.listener.onFinishSecondScene();
    }
}

export interface SecondSceneEvents {
    onFinishSecondScene(): void;
}
