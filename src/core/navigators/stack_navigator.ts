import {Navigator, Listener} from '../navigator';
import {Scene} from '../scene';

enum State {
    Inactive,
    Active,
    Destroyed,
}

export abstract class StackNavigator implements Navigator {
    public abstract initialStack(): Scene[];

    private _scenes: Scene[] | undefined;
    private get scenes(): Scene[] {
        if (this._scenes === undefined) {
            this._scenes = this.initialStack();
        }
        return this._scenes;
    }

    private state = State.Inactive;

    private listeners: Listener[] = [];

    public finish() {
        switch (this.state) {
            case State.Inactive:
                this.listeners.forEach(listener => listener.finished());
                this.scenes.reverse().forEach(listener => listener.onDestroy());
                break;
            case State.Active:
                this.listeners.forEach(listener => listener.finished());
                const last = this.getLast();
                if (last) {
                    last.onStop();
                }
                this.onDestroy();
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public push(scene: Scene) {
        switch (this.state) {
            case State.Inactive:
                this.scenes.push(scene);
                break;
            case State.Active:
                const last = this.getLast();
                if (last) {
                    last.onStop();
                }
                this.scenes.push(scene);
                scene.onStart();
                this.listeners.forEach(listener => listener.scene(scene));
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public pop() {
        switch (this.state) {
            case State.Inactive:
                const poppedScene1 = this.scenes.pop();
                if (poppedScene1) {
                    poppedScene1.onDestroy();
                }
                const last1 = this.getLast();
                if (!last1) {
                    this.listeners.forEach(listener => listener.finished());
                }
                break;
            case State.Active:
                const poppedScene2 = this.scenes.pop();
                if (poppedScene2) {
                    poppedScene2.onStop();
                    poppedScene2.onDestroy();
                }
                const last2 = this.getLast();
                if (last2) {
                    //Still one left
                    last2.onStart();
                    this.listeners.forEach(listener => listener.scene(last2));
                } else {
                    this.listeners.forEach(listener => listener.finished());
                }
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public replace(scene: Scene) {
        switch (this.state) {
            case State.Inactive:
                const replacedScene1 = this.scenes.pop();
                this.scenes.push(scene);
                if (replacedScene1) {
                    replacedScene1.onDestroy();
                }
                break;
            case State.Active:
                const replacedScene2 = this.scenes.pop();
                this.scenes.push(scene);
                if (replacedScene2) {
                    replacedScene2.onStop();
                    replacedScene2.onDestroy();
                }
                scene.onStart();
                this.listeners.forEach(listener => listener.scene(scene));
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public addNavigatorEventsListener(listener: Listener): () => void {
        this.listeners.push(listener);

        switch (this.state) {
            case State.Inactive:
                /* Noop */
                break;
            case State.Active:
                const last = this.getLast();
                if (last) {
                    listener.scene(last);
                }
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }

        return () => {
            this.listeners = this.listeners.filter(l => l === listener);
        };
    }

    public isDestroyed(): boolean {
        return this.state === State.Destroyed;
    }

    public onStart(): void {
        switch (this.state) {
            case State.Inactive:
                const last = this.getLast();
                if (!last) {
                    throw new Error('No initial scene?');
                }
                last.onStart();
                this.listeners.forEach(listener => listener.scene(last));
                this.state = State.Active;
                break;
            case State.Active:
                /* Noop */
                break;
            case State.Destroyed:
                console.warn('onStart called while destroyed');
                break;
        }
    }

    public onStop(): void {
        switch (this.state) {
            case State.Inactive:
                /* Noop */
                break;
            case State.Active:
                const last = this.getLast();
                if (!last) {
                    throw new Error('Nothing in here?');
                }
                last.onStop();
                this.listeners.forEach(listener => listener.scene(last));
                this.state = State.Inactive;
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public onDestroy(): void {
        switch (this.state) {
            case State.Inactive:
                this.scenes.reverse().forEach(scene => scene.onDestroy());
                this.state = State.Destroyed;
                break;
            case State.Active:
                this.onStop();
                this.scenes.reverse().forEach(scene => scene.onDestroy());
                this.state = State.Destroyed;
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    private getLast(): Scene | undefined {
        return this.scenes[this.scenes.length - 1];
    }
}
