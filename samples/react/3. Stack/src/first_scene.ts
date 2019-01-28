import {ViewOne} from './view_one';
import {MvvmScene} from '../../../../src/core/scenes/mvvm_scene';
import {MvvmViewProvidingScene} from '../../../../src/react/mvvm/mvvm_view_providing_scene';
import {WithController} from '../../../../src/react/mvvm/mvvm_view_factory';

export class FirstScene extends MvvmScene<FirstScene> implements MvvmViewProvidingScene<FirstScene> {
    constructor(private listener: FirstSceneEvents) {
        super();
    }

    public getMvvmView(): React.ComponentType<WithController<FirstScene>> {
        return ViewOne;
    }

    public onClick() {
        this.listener.requestSecondScreen();
    }
}

export interface FirstSceneEvents {
    requestSecondScreen(): void;
}
