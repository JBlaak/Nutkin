import {Scene} from '../../../../src/core/scene';
import {Container} from '../../../../src/core/container';
import {ViewProvidingScene} from '../../../../src/react/default/view_providing_scene';
import {SquirrelComponentClass} from '../../../../src/react/squirrel_component';
import {MyComponent} from './view';

export class MyScene implements Scene<MyContainer>, ViewProvidingScene<MyContainer> {
    private count = 3;

    public getView(): SquirrelComponentClass<MyContainer> {
        return MyComponent;
    }

    public attach(v: MyContainer): void {
        v.count = this.count;

        v.onClick = () => {
            v.count = ++this.count;
        };
    }

    public detach(v: MyContainer): void {
        /* Noop */
    }

    public onStart(): void {
        /* Noop */
    }

    public onStop(): void {
        /* Noop */
    }

    public onDestroy(): void {
        /* Noop */
    }
}

export interface MyContainer extends Container {
    count: number;
    onClick: () => void;
}
