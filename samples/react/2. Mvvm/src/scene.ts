import {MyComponent} from './view';
import {MvvmScene} from '../../../../src/core/scenes/mvvm_scene';
import {MvvmViewProvidingScene} from '../../../../src/react/mvvm/mvvm_view_providing_scene';
import {WithController} from '../../../../src/react/mvvm/mvvm_view_factory';
import {observable} from 'mobx';

export class MyScene extends MvvmScene<MyScene> implements MvvmViewProvidingScene<MyScene> {
    @observable
    public count = 3;

    public getMvvmView(): React.ComponentType<WithController<MyScene>> {
        return MyComponent;
    }

    public onClick() {
        this.count++;
    }
}
