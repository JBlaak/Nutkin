import {Scene} from '../scene';

export enum SceneState {
    Started = 'Started',
    Stopped = 'Stopped',
    Destroyed = 'Destroyed',
}

export class TestScene implements Scene {
    public states: SceneState[] = [];

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

export function scenesAreEqual(a: Scene[], b: Scene[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return !a.some((item, index) => b[index] !== item);
}
