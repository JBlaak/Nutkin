import {Scene} from '../../../../../src/core/scene';
import {ViewProvidingScene} from '../../../../../src/react/default/view_providing_scene';
import {FirstComponent} from '../ui/first';
import {ComponentType} from 'react';
import {LeftScene} from './blocks/left';
import {RightScene} from './blocks/right';
import {MiddleScene} from './blocks/middle';

export class FirstScene implements Scene, ViewProvidingScene<FirstScene> {
    constructor(
        public leftScene: LeftScene,
        public middleScene: MiddleScene,
        public rightScene: RightScene,
        private listener: FirstSceneEvents,
    ) {}

    public getView(): ComponentType<{scene: FirstScene}> {
        return FirstComponent;
    }

    public onStart(): void {
        this.leftScene.onStart();
        this.middleScene.onStart();
        this.rightScene.onStart();
    }

    public onStop(): void {
        this.leftScene.onStop();
        this.middleScene.onStop();
        this.rightScene.onStop();
    }

    public onDestroy(): void {
        this.leftScene.onDestroy();
        this.middleScene.onDestroy();
        this.rightScene.onDestroy();
    }

    public onClick() {
        this.listener.requestSecond();
    }
}

export interface FirstSceneEvents {
    requestSecond(): void;
}
