import {Scene} from '../../../../src/core/scene';
import {FirstScene, FirstSceneEvents} from './scenes/first_scene';
import {StackNavigator} from '../../../../src/core/navigators/stack_navigator';
import {SecondScene, SecondSceneEvents} from './scenes/second_scene';

export class MyNavigator extends StackNavigator implements FirstSceneEvents, SecondSceneEvents {
    public initialStack(): Scene[] {
        return [new FirstScene(this)];
    }

    public requestSecond() {
        this.push(new SecondScene(this));
    }

    public back(): void {
        this.pop();
    }
}
