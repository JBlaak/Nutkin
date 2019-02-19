import {Navigator, Listener} from '../navigator';
import {Scene} from '../scene';

enum State {
    Inactive,
    Active,
    Destroyed,
}

export abstract class SingleSceneNavigator implements Navigator {
    public abstract createScene(): Scene;

    private state: State = State.Inactive;

    private listeners: Listener[] = [];

    private _sceneInstance: Scene | undefined;

    private get _scene() {
        if (!this._sceneInstance) {
            this._sceneInstance = this.createScene();
        }
        return this._sceneInstance;
    }

    public finish() {
        switch (this.state) {
            case State.Inactive:
                this.listeners.forEach(listener => listener.finished());
                this._scene.onDestroy();
                break;
            case State.Active:
                this.listeners.forEach(listener => listener.finished());
                this._scene.onStop();
                this._scene.onDestroy();
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public addNavigatorEventsListener(listener: Listener): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    public onStart(): void {
        switch (this.state) {
            case State.Inactive:
                this.state = State.Active;
                this._scene.onStart();
                this.listeners.forEach(listener => listener.scene(this._scene));
                break;
            case State.Active:
                /* Noop */
                break;
            case State.Destroyed:
                throw new Error('Cannot start a destroyed scene');
        }
    }

    public onStop(): void {
        switch (this.state) {
            case State.Inactive:
                /* Noop */
                break;
            case State.Active:
                this.state = State.Inactive;
                this._scene.onStop();
                this.listeners.forEach(listener => listener.scene(this._scene));
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public onDestroy(): void {
        switch (this.state) {
            case State.Inactive:
                this.state = State.Destroyed;
                this._scene.onDestroy();
                break;
            case State.Active:
                this.state = State.Destroyed;
                this._scene.onStop();
                this._scene.onDestroy();
                this.listeners.forEach(listener => listener.scene(this._scene));
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public isDestroyed(): boolean {
        return this.state === State.Destroyed;
    }
}
