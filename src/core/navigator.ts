import {Scene} from './scene';

export interface Navigator {
    /**
     * @param listener
     */
    addNavigatorEventsListener(listener: Listener): () => void;

    /**
     * Starts this Navigator.
     *
     * Calling this method when the Navigator is not started or destroyed triggers
     * a call to [Scene.onStart] for the [Scene] that is currently active in the
     * Navigator.
     * Listeners registered with [addNavigatorEventsListener] will be notified of that Scene
     * through [Events.scene].
     *
     * Calling this method when the Navigator is started or destroyed has no effect.
     */
    onStart(): void;

    /**
     * Stops this Navigator.
     *
     * Calling this method when the Navigator is started triggers a call to
     * [Scene.onStop] for any [Scene]s that are currently active in the
     * Navigator.
     *
     * Calling this method when the Navigator is stopped or destroyed has no effect.
     */
    onStop(): void;

    /**
     * Destroys this Navigator.
     *
     * Calling this method when the Navigator is started will trigger a call to
     * [Scene.onStop] for the [Scene] that is currently active in the Navigator.
     * Furthermore, a call to [Scene.onDestroy] is triggered for _every_ Scene
     * this Navigator is managing.
     *
     * Calling this method when the Navigator is stopped triggers a call to
     * [Scene.onDestroy] for every Scene this Navigator is managing.
     *
     * Calling this method when the Navigator is destroyed has no effect.
     *
     * When this method has been called, the Navigator must be considered as dead,
     * and no calls to [onStart] or [onStop] should be done anymore.
     */
    onDestroy(): void;

    /**
     * Returns whether this Navigator has been destroyed.
     *
     * @return true after a call to [onDestroy].
     */
    isDestroyed(): boolean;
}

export interface Listener {
    /**
     * Called when a [Scene] change occurs in the Navigator.
     *
     * Will only be called if a Scene change occurs when the Navigator is in
     * the started state, or when the Navigator enters the started state.
     *
     * @param scene the newly active [Scene].
     */
    scene(scene: Scene): void;

    /**
     * Called when the Navigator has finished.
     *
     * Finish events occur when the Navigator has no more Scenes to show,
     * such as a stack-based Navigator with an empty stack, or a wizard
     * Navigator that reached the end of the wizard.
     */
    finished(): void;
}
