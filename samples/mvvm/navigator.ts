import {Scene} from '../../src/core/scene';
import {Container} from '../../src/core/container';
import {SceneOne, SceneOneEvents} from './ui/scene_one';
import {StackNavigator} from '../../src/core/navigators/stack_navigator';
import {SceneTwo, SceneTwoEvents} from './ui/scene_two';

export class MyNavigator extends StackNavigator implements SceneOneEvents, SceneTwoEvents {
    public initialStack(): Array<Scene<Container>> {
        return [new SceneOne(this)];
    }

    public nextStep() {
        console.log('Pushing scene two');
        this.push(new SceneTwo(this));
    }

    public onMyOtherSceneBackClick() {
        console.log('Pop');
        this.pop();
    }
}