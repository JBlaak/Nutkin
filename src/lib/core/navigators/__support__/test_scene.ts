import {Scene} from '../../scene';
import {Container} from '../../container';

export enum SceneState {
    Started = 'Started',
    Stopped = 'Stopped',
    Destroyed = 'Destroyed',
}

export interface MyContainer extends Container {}

export class TestScene implements Scene<MyContainer> {
    public states: SceneState[] = [];
    public attachedContainer: MyContainer | null = null;

    public attach(v: MyContainer): void {
        this.attachedContainer = v;
    }

    public detach(v: MyContainer): void {
        this.attachedContainer = null;
    }

    public onDestroy(): void {
        this.states.push(SceneState.Destroyed);
    }

    public onStart(): void {
        this.states.push(SceneState.Started);
    }

    public onStop(): void {
        this.states.push(SceneState.Stopped);
    }
}

export function statesAreEqual(a: SceneState[], b: SceneState[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return !a.some((item, index) => b[index] !== item);
}

export function scenesAreEqual(a: Array<Scene<Container>>, b: Array<Scene<Container>>): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return !a.some((item, index) => b[index] !== item);
}
