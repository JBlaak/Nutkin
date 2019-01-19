import {Scene} from '../scene';
import {Container} from '../container';
import {ComponentType} from 'react';
import {WithController} from '../../react/factories/mvvm_view_factory';

export abstract class MvvmScene<S> implements Scene<MvvmContainer<MvvmScene<S>>> {
    //TODO fix any
    public abstract getMvvmView(): ComponentType<WithController<S>>;

    public attach(v: MvvmContainer<MvvmScene<S>>): void {
        console.log('attach', v);
        v.attachTo(this);
    }

    public detach(v: MvvmContainer<MvvmScene<S>>): void {
        console.log('detach', v);
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
