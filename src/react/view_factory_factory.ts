import {mvvmViewFactory} from './mvvm/mvvm_view_factory';
import {isControlledViewProvidingScene} from './mvvm/mvvm_view_providing_scene';
import {isViewProvidingScene} from './default/view_providing_scene';
import {Container} from '../core/container';
import {Scene} from '../core/scene';
import {defaultViewFactory} from './default/default_view_factory';

export interface ViewFactory {
    view: any;
    instance: ((scene: Scene<Container>, view: any) => any);
}

export function getViewFactoryForScene(scene: Scene<Container>): ViewFactory {
    if (isViewProvidingScene(scene)) {
        return {
            view: scene.getView(),
            instance: defaultViewFactory,
        };
    }
    if (isControlledViewProvidingScene(scene)) {
        return {
            view: scene.getMvvmView(),
            instance: mvvmViewFactory,
        };
    }

    throw new Error('Only view providing scenes supported');
}
