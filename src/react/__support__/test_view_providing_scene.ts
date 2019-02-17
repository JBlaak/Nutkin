import {TestComponent} from './test_component';
import {ViewProvidingScene} from '../default/view_providing_scene';
import {TestScene} from '../../core/__support__/test_scene';
import {ComponentType} from 'react';

export class TestViewProvidingScene extends TestScene implements ViewProvidingScene<TestViewProvidingScene> {
    constructor(private view: ComponentType<{scene: TestViewProvidingScene}> | null = null) {
        super();
    }

    public getView(): ComponentType<{scene: TestViewProvidingScene}> {
        return this.view === null ? TestComponent : this.view;
    }
}
