import {Scene} from '../../core/scene';
import {SquirrelComponentClass} from '../squirrel_component';
import {Container} from '../../core/container';

export interface ViewProvidingScene<C> extends Scene<C> {
    getView(): SquirrelComponentClass<C>;
}

export function isViewProvidingScene<C extends Container>(scene: Scene<C>): scene is ViewProvidingScene<C> {
    return 'getView' in scene;
}
