import {StackNavigator} from '../navigators/stack_navigator';
import {Scene} from '../scene';
import {Container} from '../container';
import {NavigatorState} from './navigator_state';

export class TestStackNavigator extends StackNavigator {
    public states: NavigatorState[] = [];
    private _providedStack: Array<Scene<Container>>;

    constructor(providedStack: Array<Scene<Container>>) {
        super();
        this._providedStack = providedStack;
    }

    public initialStack(): Array<Scene<Container>> {
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
