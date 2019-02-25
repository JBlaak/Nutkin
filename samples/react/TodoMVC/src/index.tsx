import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import {Nutkin} from '../../../../src/react/nutkin';
import {TodoNavigator} from './todo_navigator';
import {DefaultComponent} from './component';

const component = new DefaultComponent();
const todoNavigator = new TodoNavigator(component);
const rootElement = document.getElementsByClassName('todoapp')[0];

ReactDOM.render(<Nutkin navigator={todoNavigator} />, rootElement);
