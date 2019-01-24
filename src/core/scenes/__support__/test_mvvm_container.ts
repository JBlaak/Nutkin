import {MvvmContainer} from '../mvvm_scene';

export class TestMvvmContainer<S> implements MvvmContainer<S> {
    public attachedTo: S | null = null;

    public attachTo(scene: S): void {
        this.attachedTo = scene;
    }

    public detachFrom(scene: S): void {
        this.attachedTo = null;
    }
}
