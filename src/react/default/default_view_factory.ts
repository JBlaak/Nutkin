import * as React from 'react';
import {FunctionComponent} from 'react';
import {Scene} from '../../core/scene';

export function defaultViewFactory(scene: Scene, view: FunctionComponent<any>) {
    return React.createElement(view, {
        scene: scene,
    });
}
