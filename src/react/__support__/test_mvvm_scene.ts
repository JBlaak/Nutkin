import * as React from 'react';
import {MvvmContainer, MvvmScene} from '../../core/scenes/mvvm_scene';
import {SceneState, TestContainer} from '../../core/__support__/test_scene';
import {WithController} from '../mvvm/mvvm_view_factory';
import {MvvmViewProvidingScene} from '../mvvm/mvvm_view_providing_scene';

export class TestMvvmScene extends MvvmScene<TestMvvmScene> implements MvvmViewProvidingScene<TestMvvmScene> {
    public states: SceneState[] = [];
    public attachedContainer: TestContainer | null = null;

    constructor(private view: React.ComponentType<WithController<TestMvvmScene>>) {
        super();
    }

    public attach(v: MvvmContainer<MvvmScene<TestMvvmScene>>): void {
        this.attachedContainer = v;
        super.attach(v);
    }

    public detach(v: MvvmContainer<MvvmScene<TestMvvmScene>>): void {
        this.attachedContainer = null;
        super.detach(v);
    }

    public onDestroy(): void {
        this.states.push(SceneState.Destroyed);
    }

    public onStart(): void {
        this.states.push(SceneState.Started);
    }

    public onStop(): void {
        this.states.push(SceneState.Stopped);
    }

    public getMvvmView(): React.ComponentType<WithController<TestMvvmScene>> {
        return this.view;
    }
}
