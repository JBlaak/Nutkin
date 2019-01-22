import {ComponentType} from 'react';
import {WithController} from './factories/mvvm_view_factory';
import {Scene} from '../core/scene';
import {Container} from '../core/container';

export interface MvvmViewProvidingScene<S> extends Scene<Container> {
    getMvvmView(): ComponentType<WithController<S>>;
}
