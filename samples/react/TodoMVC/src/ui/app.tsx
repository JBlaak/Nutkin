import * as React from 'react';
import {AppScene} from '../scenes/app_scene';
import {Form} from './components/form';
import {List} from './components/list';
import {Footer} from './components/footer';

interface OwnProps {
    scene: AppScene;
}

export const App = ({scene}: OwnProps) => {
    return (
        <div>
            <header className="header">
                <h1>todos</h1>
                <Form presenter={scene.form} />
            </header>
            <List presenter={scene.list} />
            <Footer presenter={scene.footer} />
        </div>
    );
};
