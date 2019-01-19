import {Container} from './container';

export interface Scene<V extends Container> {
    /**
     * Called when this Scene is started.
     */
    onStart(): void;

    /**
     * Attaches given [V] to this Scene.
     *
     * @param v The user interface that is being attached.
     */
    attach(v: V): void;

    /**
     * Detaches any views from this scene.
     *
     * Will always be preceded by a call to [attach].
     */
    detach(v: V): void;

    /**
     * Called when this Scene is stopped.
     */
    onStop(): void;

    /**
     * Called when this Scene will be destroyed.
     *
     * After a call to this method no more calls should be made to this Scene.
     */
    onDestroy(): void;
}
