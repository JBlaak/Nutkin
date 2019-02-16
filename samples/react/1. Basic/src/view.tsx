import * as React from 'react';
import {MyScene} from './scene';

interface OwnProps {
    scene: MyScene;
}

interface State {
    count: number;
}

export class MyComponent extends React.Component<OwnProps, State> {
    public state: State = {
        count: 0,
    };

    public componentDidMount(): void {
        this.props.scene.onCountUpdates(count => this.setState({count}));
    }

    public render() {
        return (
            <div>
                {this.state.count}
                <a onClick={() => this.props.scene.onClick()}>Click me</a>
            </div>
        );
    }
}
