import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Nutkin} from '../../../../src/react/nutkin';
import {MyNavigator} from './navigator';

ReactDOM.render(<Nutkin navigator={new MyNavigator()} />, document.getElementById('app'));
