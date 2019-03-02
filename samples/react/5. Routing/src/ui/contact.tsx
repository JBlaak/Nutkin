import * as React from 'react';
import {ContactScene} from '../scenes/contact_scene';

interface OwnProps {
    scene: ContactScene;
}

export const ContactComponent = ({scene}: OwnProps) => {
    return (
        <div>
            Howdy I'm Joris!
            <a onClick={() => scene.onClick()}>Back please..</a>
        </div>
    );
};
