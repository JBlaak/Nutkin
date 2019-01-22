import {Scene} from '../scene';
import {Container} from '../container';

export abstract class MvvmScene<S> implements Scene<MvvmContainer<MvvmScene<S>>> {
    public attach(v: MvvmContainer<MvvmScene<S>>): void {
        v.attachTo(this);
    }

    public detach(v: MvvmContainer<MvvmScene<S>>): void {
        v.detachFrom(this);
    }

    public onDestroy(): void {
        /* Noop */
    }

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }
}

export interface MvvmContainer<S> extends Container {
    attachTo(scene: S): void;

    detachFrom(scene: S): void;
}
