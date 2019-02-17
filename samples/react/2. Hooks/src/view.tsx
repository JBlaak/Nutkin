import * as React from 'react';
import {useEffect, useState} from 'react';
import {MyScene} from './scene';

interface OwnProps {
    scene: MyScene;
}

export const MyComponent = ({scene}: OwnProps) => {
    const [count, setCount] = useState(scene.count);
    useEffect(() => scene.onCountUpdates(setCount), [scene]);

    return (
        <div>
            {count}
            <a onClick={() => scene.onClick()}>Click me</a>
        </div>
    );
};
