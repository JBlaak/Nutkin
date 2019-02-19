import {Navigator, Listener} from '../navigator';
import {Scene} from '../scene';

enum State {
    Inactive,
    Active,
    Destroyed,
}

export abstract class CompositeStackNavigator implements Navigator, Listener {
    public abstract initialStack(): Navigator[];

    private activeScene: Scene | null = null;

    private _navigators: Navigator[] | undefined;
    private get navigators(): Navigator[] {
        if (this._navigators === undefined) {
            this._navigators = this.initialStack();
            this._navigators.forEach(navigator => this.addListenerTo(navigator));
        }
        return this._navigators;
    }

    private state = State.Inactive;

    private listeners: Listener[] = [];

    public addNavigatorEventsListener(listener: Listener): () => void {
        this.listeners.push(listener);

        switch (this.state) {
            case State.Inactive:
                /* Noop */
                break;
            case State.Active:
                const activeScene = this.activeScene;
                if (activeScene !== null) {
                    this.listeners.forEach(l => l.scene(activeScene));
                }
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private addListenerTo(navigator: Navigator) {
        // Child navigators have a shorter lifetime than their parent navigators,
        // so it is not necessary to unregister the listener.
        // noinspection CheckResult
        navigator.addNavigatorEventsListener(this);
    }

    public finished(): void {
        throw new Error('TODO');
    }

    public scene(scene: Scene): void {
        this.activeScene = scene;
        this.listeners.forEach(listener => listener.scene(scene));
    }

    public finish() {
        switch (this.state) {
            case State.Inactive:
                this.listeners.forEach(listener => listener.finished());
                this.navigators.reverse().forEach(listener => listener.onDestroy());
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

    public isDestroyed(): boolean {
        return this.state === State.Destroyed;
    }

    public replace(navigator: Navigator) {
        this.addListenerTo(navigator);

        switch (this.state) {
            case State.Inactive:
                const replacedNavigator1 = this.navigators.pop();
                this.navigators.push(navigator);
                if (replacedNavigator1) {
                    replacedNavigator1.onDestroy();
                }
                break;
            case State.Active:
                const replacedNavigator2 = this.navigators.pop();
                this.navigators.push(navigator);
                if (replacedNavigator2) {
                    replacedNavigator2.onStop();
                    replacedNavigator2.onDestroy();
                }
                navigator.onStart();
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public push(navigator: Navigator) {
        this.addListenerTo(navigator);
        switch (this.state) {
            case State.Inactive:
                this.navigators.push(navigator);
                break;
            case State.Active:
                const last = this.getLast();
                if (last) {
                    last.onStop();
                }
                this.navigators.push(navigator);
                navigator.onStart();
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public pop() {
        switch (this.state) {
            case State.Inactive:
                const poppedNavigator1 = this.navigators.pop();
                if (poppedNavigator1) {
                    poppedNavigator1.onDestroy();
                }

                const last1 = this.getLast();
                if (!last1) {
                    this.listeners.forEach(listener => listener.finished());
                    this.state = State.Destroyed;
                } else {
                    last1.onDestroy();
                }
                break;
            case State.Active:
                const poppedNavigator2 = this.navigators.pop();
                if (poppedNavigator2) {
                    poppedNavigator2.onStop();
                    poppedNavigator2.onDestroy();
                }
                const last2 = this.getLast();
                if (!last2) {
                    this.listeners.forEach(listener => listener.finished());
                    this.state = State.Destroyed;
                } else {
                    last2.onStart();
                }
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    public onStart(): void {
        switch (this.state) {
            case State.Inactive:
                const last = this.getLast();
                if (last) {
                    last.onStart();
                }
                this.state = State.Active;
                break;
            case State.Active:
                /* Noop */
                break;
            case State.Destroyed:
                /* Noop */
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
                this.navigators.reverse().forEach(navigator => navigator.onDestroy());
                this.state = State.Destroyed;
                break;
            case State.Active:
                this.onStop();
                this.navigators.reverse().forEach(navigator => navigator.onDestroy());
                this.state = State.Destroyed;
                break;
            case State.Destroyed:
                /* Noop */
                break;
        }
    }

    private getLast(): Navigator | undefined {
        return this.navigators[this.navigators.length - 1];
    }
}
