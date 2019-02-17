import * as React from 'react';
import {RightScene} from '../../scenes/blocks/right';
import {Block} from '../components/block';
import {useObservable} from '../support/use_observable';

interface OwnProps {
    scene: RightScene;
}
export const Right = ({scene}: OwnProps) => {
    const count = useObservable(scene.count);

    return (
        <Block>
            <h2>Right (rx)</h2>
            {count}
            <a onClick={() => scene.onClick()}>Click</a>
        </Block>
    );
};
