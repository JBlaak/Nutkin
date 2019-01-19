import {Navigator} from '../../navigator';
import {Scene} from '../../scene';
import {Container} from '../../container';

export class TestNavigationEventsListener implements Navigator.Events {
    public isFinished = false;
    public scenes: Array<Scene<Container>> = [];

    public get lastScene(): Scene<Container> {
        return this.scenes[this.scenes.length - 1] || null;
    }

    public finished(): void {
        this.isFinished = true;
    }

    public scene(scene: Scene<Container>): void {
        this.scenes.push(scene);
    }
}
