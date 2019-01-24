import React from 'react';
import ReactDOM from 'react-dom';
import './ui/misc/index.css';
import {MyNavigator} from './navigator';
import {Squirrel} from '../../src/react/squirrel';

const myNavigator = new MyNavigator();

ReactDOM.render(<Squirrel navigator={myNavigator} />, document.getElementById('root'));
