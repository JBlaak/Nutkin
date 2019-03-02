import {SingleSceneNavigator} from '../../../../src/core/navigators/single_scene_navigator';
import {Scene} from '../../../../src/nutkin';
import {ViewUserScene, ViewUserEvents} from './scenes/view_user_scene';

export class ViewUserNavigator extends SingleSceneNavigator {
    constructor(private userId: number, private listener: ViewUserEvents) {
        super();
    }

    public createScene(): Scene {
        return new ViewUserScene(this.userId, this.listener);
    }
}
