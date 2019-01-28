import * as React from 'react';
import {SquirrelComponent} from '../../../../src/react/squirrel_component';
import {MyContainer} from './scene';

interface OwnProps {}

interface State {
    count: number;
}

export class MyComponent extends SquirrelComponent<MyContainer, OwnProps, State> implements MyContainer {
    public state: State = {
        count: 0,
    };

    public onClick = () => {};

    public set count(value: number) {
        this.setState({
            count: value,
        });
    }

    public render() {
        return (
            <div>
                {this.state.count}
                <a onClick={this.onClick}>Click me</a>
            </div>
        );
    }
}
