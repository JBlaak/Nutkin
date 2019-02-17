import * as React from 'react';
import {MiddleScene} from '../../scenes/blocks/middle';
import {Block} from '../components/block';
import {observer} from 'mobx-react';

interface OwnProps {
    scene: MiddleScene;
}
export const Middle = observer(({scene}: OwnProps) => {
    return (
        <Block>
            <h2>Middle (mobx)</h2>
            {scene.count}
            <a onClick={() => scene.onClick()}>Click</a>
        </Block>
    );
});
