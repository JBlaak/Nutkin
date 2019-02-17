import * as React from 'react';
import {FirstScene} from '../scenes/first_scene';
import {Left} from './blocks/left';
import {Middle} from './blocks/middle';
import {Right} from './blocks/right';

interface OwnProps {
    scene: FirstScene;
}

export const FirstComponent = ({scene}: OwnProps) => {
    return (
        <div>
            <h1>First</h1>
            <Left scene={scene.leftScene} />
            <Middle scene={scene.middleScene} />
            <Right scene={scene.rightScene} />
            <br />
            <a onClick={() => scene.onClick()}>To the next!</a>
        </div>
    );
};
