import {Scene} from '../../../../src/core/scene';
import {Container} from '../../../../src/core/container';
import {FirstScene, FirstSceneEvents} from './first_scene';
import {StackNavigator} from '../../../../src/core/navigators/stack_navigator';
import {SecondScene, SecondSceneEvents} from './second_scene';

export class MyNavigator extends StackNavigator implements FirstSceneEvents, SecondSceneEvents {
    public initialStack(): Array<Scene<Container>> {
        return [new FirstScene(this)];
    }

    public requestSecondScreen(): void {
        this.push(new SecondScene(this));
    }

    public onFinishSecondScene(): void {
        this.pop();
    }
}
