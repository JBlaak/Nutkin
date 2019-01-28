import * as React from 'react';
import {WithController} from '../../../../src/react/mvvm/mvvm_view_factory';
import {FirstScene} from './first_scene';
import {observer} from 'mobx-react';

@observer
export class ViewOne extends React.Component<WithController<FirstScene>> {
    public render() {
        return (
            <div>
                First view!
                <a onClick={() => this.props.controller.onClick()}>Click me</a>
            </div>
        );
    }
}
