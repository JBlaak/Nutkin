import {Scene} from '../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../src/react/default/view_providing_scene';
import {MyComponent} from './view';
import {ComponentType} from 'react';

export class MyScene implements Scene, ViewProvidingScene<MyScene> {
    public count = 0;
    private countListeners: Array<(count: number) => void> = [];

    public getView(): ComponentType<{scene: MyScene}> {
        return MyComponent;
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
