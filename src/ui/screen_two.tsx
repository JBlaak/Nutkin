import React from 'react';
import './misc/app.css';
import {SceneTwo} from './scene_two';
import {WithController} from '../lib/react/mvvm/mvvm_view_factory';

export const ScreenTwo = ({controller}: WithController<SceneTwo>) => {
    return (
        <div>
            {controller.bar}
            <a onClick={() => controller.onClick()}>Go back</a>
        </div>
    );
};
