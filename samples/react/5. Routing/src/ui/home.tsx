import * as React from 'react';
import {HomeScene} from '../scenes/home_scene';

interface OwnProps {
    scene: HomeScene;
}

export const HomeComponent = ({scene}: OwnProps) => {
    return (
        <div>
            Home!
            <br />
            <a onClick={() => scene.onUserClick(1)}>View user 1</a>
            <a onClick={() => scene.onUserClick(2)}>View user 2</a>
            <br />
            <a href="/contact">An actual link to /contact</a>
        </div>
    );
};
