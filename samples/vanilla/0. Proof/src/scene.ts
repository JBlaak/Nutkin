import {Scene} from '../../../../src/core/scene';
import {ProvidesIdentity} from '../../../../src/core/scenes/provides_identity';

export class MyScene implements Scene, ProvidesIdentity {
    public identity = 'initial';

    public count = 0;
    private countListeners: Array<(count: number) => void> = [];

    public onStart(): void {
        this.countListeners.forEach(listener => listener(this.count));
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }

    /**
     * This might also be a mobx observable or a proper RxJS observable
     * @param listener
     */
    public onCountUpdates(listener: (count: number) => void) {
        this.countListeners.push(listener);

        return () => (this.countListeners = this.countListeners.filter(l => l !== listener));
    }

    public onClick() {
        this.count++;
        this.countListeners.forEach(listener => listener(this.count));
    }
}
