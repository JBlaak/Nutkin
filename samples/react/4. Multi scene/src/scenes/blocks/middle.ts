import {Scene} from '../../../../../../src/core/scene';
import {action, observable} from 'mobx';

export class MiddleScene implements Scene {
    @observable
    public count = 0;

    @action
    public onClick() {
        this.count++;
    }

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }
}
