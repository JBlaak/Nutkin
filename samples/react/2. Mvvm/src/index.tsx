import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Squirrel} from '../../../../src/react/squirrel';
import {MyNavigator} from './navigator';

ReactDOM.render(<Squirrel navigator={new MyNavigator()} />, document.getElementById('app'));
