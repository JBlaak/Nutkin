import {Scene} from '../../core/scene';
import {ComponentType} from 'react';

export interface ViewProvidingScene<S extends Scene> extends Scene {
    getView(): ComponentType<{scene: S}>;
}

export function isViewProvidingScene<S extends Scene>(scene: any): scene is ViewProvidingScene<S> {
    return 'getView' in scene;
}
