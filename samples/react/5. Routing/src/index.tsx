import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Nutkin} from '../../../../src/react/nutkin';
import {AppNavigator} from './app_navigator';
import {createBrowserHistory} from 'history';

ReactDOM.render(<Nutkin navigator={new AppNavigator(createBrowserHistory())} />, document.getElementById('app'));
