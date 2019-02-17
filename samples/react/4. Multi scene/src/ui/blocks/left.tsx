import * as React from 'react';
import {LeftScene} from '../../scenes/blocks/left';
import {Block} from '../components/block';
import {useEffect, useState} from 'react';

interface OwnProps {
    scene: LeftScene;
}
export const Left = ({scene}: OwnProps) => {
    const [count, setCount] = useState(scene.count);
    useEffect(() => scene.onCountUpdates(setCount), [scene]);

    return (
        <Block>
            <h2>Left ("vanilla")</h2>
            {count}
            <a onClick={() => scene.onClick()}>Click</a>
        </Block>
    );
};
