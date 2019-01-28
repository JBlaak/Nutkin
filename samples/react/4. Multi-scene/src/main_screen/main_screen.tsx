import * as React from 'react';
import {WithController} from '../../../../../src/react/mvvm/mvvm_view_factory';
import {observer} from 'mobx-react';
import {MainScene} from './main_scene';
import {LeftBlock} from './left_block';
import {RightBlock} from './right_block';

@observer
export class MainScreen extends React.Component<WithController<MainScene>> {
    public render() {
        return (
            <div>
                <a onClick={() => this.props.controller.onClick()}>Away from here</a>
                <div style={{position: 'absolute', left: '25%'}}>
                    <LeftBlock controller={this.props.controller.left} />
                </div>
                <div style={{position: 'absolute', right: '25%'}}>
                    <RightBlock controller={this.props.controller.right} />
                </div>
            </div>
        );
    }
}
