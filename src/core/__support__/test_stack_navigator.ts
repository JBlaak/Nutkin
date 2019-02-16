import {StackNavigator} from '../navigators/stack_navigator';
import {Scene} from '../scene';
import {NavigatorState} from './navigator_state';

export class TestStackNavigator extends StackNavigator {
    public states: NavigatorState[] = [];
    private _providedStack: Scene[];

    constructor(providedStack: Scene[]) {
        super();
        this._providedStack = providedStack;
    }

    public initialStack(): Scene[] {
        return this._providedStack;
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
