import {CompositeStackNavigator} from '../navigators/composite_stack_navigator';
import {Navigator} from '../navigator';
import {NavigatorState} from './navigator_state';

export class TestCompositeStackNavigator extends CompositeStackNavigator {
    public states: NavigatorState[] = [];

    constructor(private _initialStack: Navigator.Instance[]) {
        super();
    }

    public initialStack(): Navigator.Instance[] {
        return this._initialStack;
    }

    public onStart(): void {
        this.states.push(NavigatorState.Started);
        super.onStart();
    }

    public onStop(): void {
        this.states.push(NavigatorState.Stopped);
        super.onStop();
    }

    public onDestroy(): void {
        this.states.push(NavigatorState.Destroyed);
        super.onDestroy();
    }
}

export function navigatorStatesAreEqual(a: NavigatorState[], b: NavigatorState[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return !a.some((item, index) => b[index] !== item);
}
