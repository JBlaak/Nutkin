import {Scene} from '../core/scene';
import {SquirrelComponentClass} from './squirrel_component';

export interface ViewProvidingScene<C> extends Scene<C> {
    getView(): SquirrelComponentClass<C>;
}
