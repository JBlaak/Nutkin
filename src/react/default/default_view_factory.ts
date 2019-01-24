import * as React from 'react';
import {Scene} from '../../core/scene';
import {Container} from '../../core/container';
import {FunctionComponent} from 'react';

export function defaultViewFactory(scene: Scene<Container>, view: FunctionComponent<any>) {
    return React.createElement(view, {
        attach: scene.attach.bind(scene),
        detach: scene.detach.bind(scene),
    });
}
