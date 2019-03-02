import {CompositeStackNavigator} from '../nutkin';
import {Navigator} from '../nutkin';
import {Action, History, Location} from 'history';

export abstract class HistoryCompositeStackNavigator extends CompositeStackNavigator {
    private unregisterCallback: (() => void) | undefined;

    constructor(public history: History) {
        super();
    }

    public onStart(): void {
        super.onStart();
        this.unregisterCallback = this.history.listen((location: Location, action: Action) => {
            switch (action) {
                case 'PUSH':
                    this.push(this.navigatorForLocation(location));
                    break;
                case 'POP':
                    if (this.stack.length === 1) {
                        this.replace(this.navigatorForLocation(location));
                    } else {
                        this.pop();
                    }
                    break;
                case 'REPLACE':
                    this.replace(this.navigatorForLocation(location));
                    break;
            }
        });
    }

    public onStop(): void {
        super.onStop();
        if (this.unregisterCallback) {
            this.unregisterCallback();
        }
    }

    public initialStack(): Navigator[] {
        return [this.navigatorForLocation(this.history.location)];
    }

    public abstract navigatorForLocation(location: Location): Navigator;
}
