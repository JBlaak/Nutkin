import {SingleSceneNavigator} from '../navigators/single_scene_navigator';
import {Scene} from '../scene';
import {NavigatorState} from './navigator_state';

export class TestSingleSceneNavigator extends SingleSceneNavigator {
    public states: NavigatorState[] = [];

    constructor(private scene: Scene) {
        super();
    }

    public createScene(): Scene {
        return this.scene;
    }

    public onStart(): void {
        this.states.push(NavigatorState.Started);
        super.onStart();
    }

    public onStop(): void {
        this.states.push(NavigatorState.Stopped);
        super.onStop();
    }

    public onDestroy(): void {
        this.states.push(NavigatorState.Destroyed);
        super.onDestroy();
    }
}

export function navigatorStatesAreEqual(a: NavigatorState[], b: NavigatorState[]): boolean {
    if (a.length !== b.length) {
        return false;
    }
    if (a.length === 0) {
        return true;
    }

    return !a.some((item, index) => b[index] !== item);
}
