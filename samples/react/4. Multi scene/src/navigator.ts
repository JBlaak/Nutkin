import {Scene} from '../../../../src/core/scene';
import {FirstScene, FirstSceneEvents} from './scenes/first_scene';
import {StackNavigator} from '../../../../src/core/navigators/stack_navigator';
import {SecondScene, SecondSceneEvents} from './scenes/second_scene';
import {RightScene} from './scenes/blocks/right';
import {MiddleScene} from './scenes/blocks/middle';
import {LeftScene} from './scenes/blocks/left';

export class MyNavigator extends StackNavigator implements FirstSceneEvents, SecondSceneEvents {
    public initialStack(): Scene[] {
        return [new FirstScene(new LeftScene(), new MiddleScene(), new RightScene(), this)];
    }

    public requestSecond() {
        this.push(new SecondScene(this));
    }

    public back(): void {
        this.pop();
    }
}
