import {SingleSceneNavigator} from '../../../../src/core/navigators/single_scene_navigator';
import {Scene} from '../../../../src/core/scene';
import {Container} from '../../../../src/core/container';
import {MyScene} from './scene';

export class MyNavigator extends SingleSceneNavigator {
    public createScene(): Scene<Container> {
        return new MyScene();
    }
}
