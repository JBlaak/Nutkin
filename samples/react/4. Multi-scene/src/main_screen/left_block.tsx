import * as React from 'react';
import {LeftScene} from './left_scene';
import {observer} from 'mobx-react';

interface OwnProps {
    controller: LeftScene;
}

@observer
export class LeftBlock extends React.Component<OwnProps> {
    public render() {
        return (
            <div style={{width: 100, height: 100, border: '1px solid red'}}>
                Left
                <br />
                {this.props.controller.count}
                <br />
                <a onClick={() => this.props.controller.onClick()}>Click</a>
            </div>
        );
    }
}
