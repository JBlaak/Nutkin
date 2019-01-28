import {MvvmScene} from '../../../../../src/core/scenes/mvvm_scene';
import {observable} from 'mobx';

export class RightScene extends MvvmScene<RightScene> {
    @observable
    public count = 3;

    public onClick() {
        this.count++;
    }
}
