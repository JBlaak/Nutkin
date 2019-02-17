import {Scene} from '../../../../../../src/core/scene';
import {BehaviorSubject} from 'rxjs';

export class RightScene implements Scene {
    private _count = 0;
    public count = new BehaviorSubject(this._count);

    public onClick() {
        this._count++;
        this.count.next(this._count);
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
