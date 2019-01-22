import {StackNavigator} from '../navigators/stack_navigator';
import {Scene} from '../scene';
import {Container} from '../container';

export class TestStackNavigator extends StackNavigator {
    private _providedStack: Array<Scene<Container>>;

    constructor(providedStack: Array<Scene<Container>>) {
        super();
        this._providedStack = providedStack;
    }

    public initialStack(): Array<Scene<Container>> {
        return this._providedStack;
    }
}
