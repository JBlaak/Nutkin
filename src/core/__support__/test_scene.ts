import {Scene} from '../scene';
import {Container} from '../container';

export enum SceneState {
    Started = 'Started',
    Stopped = 'Stopped',
    Destroyed = 'Destroyed',
}

export interface TestContainer extends Container {}

export class TestScene implements Scene<TestContainer> {
    public states: SceneState[] = [];
    public attachedContainer: TestContainer | null = null;

    public attach(v: TestContainer): void {
        this.attachedContainer = v;
    }

    public detach(v: TestContainer): void {
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
