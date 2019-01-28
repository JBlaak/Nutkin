import * as React from 'react';
import {WithController} from '../../../../src/react/mvvm/mvvm_view_factory';
import {MyScene} from './scene';
import {observer} from 'mobx-react';

@observer
export class MyComponent extends React.Component<WithController<MyScene>> {
    public render() {
        return (
            <div>
                {this.props.controller.count}
                <a onClick={() => this.props.controller.onClick()}>Click me</a>
            </div>
        );
    }
}
