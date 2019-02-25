import {Scene} from '../../../../src/core/scene';
import {AppScene} from './scenes/app_scene';
import {SingleSceneNavigator} from '../../../../src/nutkin';
import {Component} from './component';

export class TodoNavigator extends SingleSceneNavigator {
    constructor(private component: Component) {
        super();
    }

    public createScene(): Scene {
        return new AppScene(this.component.todoInteractor);
    }
}
