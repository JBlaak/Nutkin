import {SingleSceneNavigator} from '../navigators/single_scene_navigator';
import {Scene} from '../scene';
import {Container} from '../container';

export enum NavigatorState {
    Started = 'started',
    Stopped = 'stopped',
    Destroyed = 'destroyed',
}

export class TestSingleSceneNavigator extends SingleSceneNavigator {
    public states: NavigatorState[] = [];

    constructor(private scene: Scene<Container>) {
        super();
    }

    public createScene(): Scene<Container> {
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

    return !a.some((item, index) => b[index] !== item);
}
