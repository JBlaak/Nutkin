import {ComponentType} from 'react';
import {WithController} from './mvvm_view_factory';
import {Scene} from '../../core/scene';
import {Container} from '../../core/container';

export interface MvvmViewProvidingScene<S> extends Scene<Container> {
    getMvvmView(): ComponentType<WithController<S>>;
}

export function isControlledViewProvidingScene<C extends Container>(
    scene: Scene<C>,
): scene is MvvmViewProvidingScene<C> {
    return 'getMvvmView' in scene;
}
