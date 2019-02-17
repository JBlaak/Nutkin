import * as React from 'react';
import {FirstScene} from '../scenes/first_scene';

interface OwnProps {
    scene: FirstScene;
}

export const FirstComponent = ({scene}: OwnProps) => {
    return (
        <div>
            First!
            <a onClick={() => scene.onClick()}>To the next!</a>
        </div>
    );
};
