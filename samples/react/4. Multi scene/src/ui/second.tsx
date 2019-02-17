import * as React from 'react';
import {SecondScene} from '../scenes/second_scene';

interface OwnProps {
    scene: SecondScene;
}

export const SecondComponent = ({scene}: OwnProps) => {
    return (
        <div>
            Second!
            <a onClick={() => scene.onClick()}>Back please..</a>
        </div>
    );
};
