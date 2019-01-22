import {MvvmScene} from '../mvvm_scene';
import {SceneOne} from '../../../../ui/scene_one';
import {ComponentType} from 'react';
import {WithController} from '../../../react/factories/mvvm_view_factory';
import {MvvmViewProvidingScene} from '../../../react/mvvm_view_providing_scene';

export class TestMvvmScene extends MvvmScene<TestMvvmScene> implements MvvmViewProvidingScene<TestMvvmScene> {
    public getMvvmView(): ComponentType<WithController<TestMvvmScene>> {
        throw new Error('Not implemented');
    }
}
