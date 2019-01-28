import {Scene} from '../../../../src/core/scene';
import {Container} from '../../../../src/core/container';
import {MainScene, MainSceneEvents} from './main_screen/main_scene';
import {LeftScene} from './main_screen/left_scene';
import {RightScene} from './main_screen/right_scene';
import {StackNavigator} from '../../../../src/core/navigators/stack_navigator';
import {SecondScene, SecondSceneEvents} from './second_screen/second_scene';

export class MyNavigator extends StackNavigator implements MainSceneEvents, SecondSceneEvents {
    public initialStack(): Array<Scene<Container>> {
        return [new MainScene(this, new LeftScene(), new RightScene())];
    }

    public requestSecondScreen(): void {
        this.push(new SecondScene(this));
    }

    public finishSecondScene(): void {
        this.pop();
    }
}
