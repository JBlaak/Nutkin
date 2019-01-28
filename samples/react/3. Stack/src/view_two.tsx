import * as React from 'react';
import {WithController} from '../../../../src/react/mvvm/mvvm_view_factory';
import {SecondScene} from './second_scene';
import {observer} from 'mobx-react';

@observer
export class ViewTwo extends React.Component<WithController<SecondScene>> {
    public render() {
        return (
            <div>
                Second view!
                <a onClick={() => this.props.controller.onClick()}>Back</a>
            </div>
        );
    }
}
