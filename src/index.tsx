import React from 'react';
import ReactDOM from 'react-dom';
import './ui/misc/index.css';
import {Squirrel} from './lib/react/squirrel';
import {MyNavigator} from './navigator';

const myNavigator = new MyNavigator();

ReactDOM.render(<Squirrel navigator={myNavigator} />, document.getElementById('root'));
