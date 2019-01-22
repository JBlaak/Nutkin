import {SingleSceneNavigator} from '../navigators/single_scene_navigator';
import {Scene} from '../scene';
import {Container} from '../container';

export class TestSingleSceneNavigator extends SingleSceneNavigator {
    constructor(private scene: Scene<Container>) {
        super();
    }

    public createScene(): Scene<Container> {
        return this.scene;
    }
}
