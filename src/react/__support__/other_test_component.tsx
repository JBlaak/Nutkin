import {SquirrelComponent} from '../squirrel_component';
import {TestContainer} from '../../core/__support__/test_scene';
import * as React from 'react';

export class OtherTestComponent extends SquirrelComponent<TestContainer> {
    public render() {
        return <div>Ho</div>;
    }
}
