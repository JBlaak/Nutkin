import {MvvmScene} from '../../../../../src/core/scenes/mvvm_scene';
import {observable} from 'mobx';

export class LeftScene extends MvvmScene<LeftScene> {
    @observable
    public count = 3;

    public onClick() {
        this.count++;
    }
}
