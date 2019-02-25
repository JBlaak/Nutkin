import {isViewProvidingScene} from './default/view_providing_scene';
import {Scene} from '../nutkin';
import {defaultViewFactory} from './default/default_view_factory';

export interface ViewFactory {
    view: any;
    instance: ((scene: Scene, view: any) => any);
}

export function getViewFactoryForScene(scene: Scene): ViewFactory {
    if (isViewProvidingScene(scene)) {
        return {
            view: scene.getView(),
            instance: defaultViewFactory,
        };
    }

    throw new Error('Only view providing scenes supported');
}
