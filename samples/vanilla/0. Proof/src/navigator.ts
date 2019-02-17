import {SingleSceneNavigator} from '../../../../src/core/navigators/single_scene_navigator';
import {Scene} from '../../../../src/core/scene';
import {MyScene} from './scene';

export class MyNavigator extends SingleSceneNavigator {
    public createScene(): Scene {
        return new MyScene();
    }
}
