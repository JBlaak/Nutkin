import {MainScreen} from './main_screen';
import {MvvmScene} from '../../../../../src/core/scenes/mvvm_scene';
import {MvvmViewProvidingScene} from '../../../../../src/react/mvvm/mvvm_view_providing_scene';
import {WithController} from '../../../../../src/react/mvvm/mvvm_view_factory';
import {LeftScene} from './left_scene';
import {RightScene} from './right_scene';

export class MainScene extends MvvmScene<MainScene> implements MvvmViewProvidingScene<MainScene> {
    constructor(public listener: MainSceneEvents, public left: LeftScene, public right: RightScene) {
        super();
    }

    public getMvvmView(): React.ComponentType<WithController<MainScene>> {
        return MainScreen;
    }

    public onClick() {
        this.listener.requestSecondScreen();
    }

    /**
     * Just manually convert lifecycle to sub-scenes
     */
    public onStart(): void {
        super.onStart();
        this.left.onStart();
        this.right.onStart();
    }

    public onStop(): void {
        super.onStop();
        this.left.onStop();
        this.right.onStop();
    }

    public onDestroy(): void {
        super.onDestroy();
        this.left.onDestroy();
        this.right.onDestroy();
    }
}

export interface MainSceneEvents {
    requestSecondScreen(): void;
}
