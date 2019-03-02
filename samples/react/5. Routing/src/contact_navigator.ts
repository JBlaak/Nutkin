import {SingleSceneNavigator} from '../../../../src/core/navigators/single_scene_navigator';
import {Scene} from '../../../../src/nutkin';
import {ContactScene, ContactEvents} from './scenes/contact_scene';

export class ContactNavigator extends SingleSceneNavigator {
    constructor(private listener: ContactEvents) {
        super();
    }

    public createScene(): Scene {
        return new ContactScene(this.listener);
    }
}
