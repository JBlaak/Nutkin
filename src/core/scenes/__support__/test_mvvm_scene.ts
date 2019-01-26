import {MvvmScene} from '../mvvm_scene';
import {ComponentType} from 'react';
import {WithController} from '../../../react/mvvm/mvvm_view_factory';
import {MvvmViewProvidingScene} from '../../../react/mvvm/mvvm_view_providing_scene';

export class TestMvvmScene extends MvvmScene<TestMvvmScene> implements MvvmViewProvidingScene<TestMvvmScene> {
    public getMvvmView(): ComponentType<WithController<TestMvvmScene>> {
        throw new Error('Not implemented');
    }
}
