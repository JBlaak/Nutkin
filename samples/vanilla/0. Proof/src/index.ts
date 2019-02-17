import {MyNavigator} from './navigator';
import {Navigator} from '../../../../src/core/navigator';
import {Scene} from '../../../../src/core/scene';
import {renderer} from './view';
import {willProvideIdentity} from '../../../../src/core/scenes/provides_identity';
import {MyScene} from './scene';

const myNavigator = new MyNavigator();

class MyListener implements Navigator.Events {
    constructor(private element: HTMLElement) {}

    public finished(): void {
        //TODO
    }

    public scene(scene: Scene): void {
        if (willProvideIdentity(scene)) {
            switch (scene.identity) {
                case 'initial':
                    renderer((scene as unknown) as MyScene, this.element);
                    break;
            }
        }
    }
}

const element: HTMLElement | null = document.getElementById('app');
if (element !== null) {
    myNavigator.addNavigatorEventsListener(new MyListener(element));
    myNavigator.onStart();
}
