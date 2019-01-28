import * as React from 'react';
import {RightScene} from './right_scene';
import {observer} from 'mobx-react';

interface OwnProps {
    controller: RightScene;
}

@observer
export class RightBlock extends React.Component<OwnProps> {
    public render() {
        return (
            <div style={{width: 100, height: 100, border: '1px solid blue'}}>
                Right
                <br />
                {this.props.controller.count}
                <br />
                <a onClick={() => this.props.controller.onClick()}>Click</a>
            </div>
        );
    }
}
