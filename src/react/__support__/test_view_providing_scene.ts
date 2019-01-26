import {TestComponent} from './test_component';
import {TestContainer, TestScene} from '../../core/__support__/test_scene';
import {ViewProvidingScene} from '../default/view_providing_scene';
import {SquirrelComponentClass} from '../squirrel_component';

export class TestViewProvidingScene extends TestScene implements ViewProvidingScene<TestContainer> {
    constructor(private view: SquirrelComponentClass<TestContainer> | null = null) {
        super();
    }

    public getView(): SquirrelComponentClass<TestContainer> {
        return this.view === null ? TestComponent : this.view;
    }
}
