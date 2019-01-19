import React from 'react';
import './misc/app.css';
import {WithController} from '../lib/react/factories/mvvm_view_factory';
import {SceneOne} from './scene_one';

export const ScreenOne = ({controller}: WithController<SceneOne>) => {
    return (
        <div>
            {controller.foo}
            <a onClick={() => controller.onClick()}>Go to next</a>
        </div>
    );
};
