import {SingleSceneNavigator} from '../../../../src/core/navigators/single_scene_navigator';
import {Scene} from '../../../../src/nutkin';
import {HomeScene, HomeEvents} from './scenes/home_scene';

export class HomeNavigator extends SingleSceneNavigator {
    constructor(private listener: HomeEvents) {
        super();
    }

    public createScene(): Scene {
        return new HomeScene(this.listener);
    }
}
