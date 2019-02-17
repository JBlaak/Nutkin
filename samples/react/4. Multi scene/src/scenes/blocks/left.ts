import {Scene} from '../../../../../../src/core/scene';

export class LeftScene implements Scene {
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
    public onCountUpdates(listener: (count: number) => void): () => void {
        this.countListeners.push(listener);

        return () => (this.countListeners = this.countListeners.filter(l => l !== listener));
    }

    public onClick() {
        this.count++;
        this.countListeners.forEach(listener => listener(this.count));
    }
}
