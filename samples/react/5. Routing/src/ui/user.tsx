import * as React from 'react';
import {ViewUserScene} from '../scenes/view_user_scene';

interface OwnProps {
    scene: ViewUserScene;
}

export const ViewUserComponent = ({scene}: OwnProps) => {
    return (
        <div>
            User ({scene.userId})!
            <br />
            <a onClick={() => scene.onClickBack()}>Back please..</a>
        </div>
    );
};
