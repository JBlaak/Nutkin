import {Navigator, Listener} from '../navigator';
import {Scene} from '../scene';

export class TestNavigationEventsListener implements Listener {
    public isFinished = false;
    public scenes: Scene[] = [];

    public get lastScene(): Scene {
        return this.scenes[this.scenes.length - 1] || null;
    }

    public finished(): void {
        this.isFinished = true;
    }

    public scene(scene: Scene): void {
        this.scenes.push(scene);
    }
}
