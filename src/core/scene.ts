export interface Scene {
    /**
     * Called when this Scene is started.
     */
    onStart(): void;

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
