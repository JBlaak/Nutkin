import * as React from 'react';
import {Fragment} from 'react';
import {Scene} from '../core/scene';
import {Container} from '../core/container';
import {ViewProvidingScene} from './view_providing_scene';
import {SquirrelComponentClass} from './squirrel_component';
import {Navigator} from '../core/navigator';
import {mvvmViewFactory} from './factories/mvvm_view_factory';
import {MvvmViewProvidingScene} from './mvvm_view_providing_scene';

interface OwnProps {
    navigator: Navigator.Instance;
}

interface ViewFactory {
    view: any;
    instance: null | ((scene: Scene<Container>, view: any) => any);
}

interface State {
    lastUpdate: number;
    scene: Scene<Container> | null;
    factory: ViewFactory | null;
}

export class Squirrel extends React.Component<OwnProps, State> implements Navigator.Events {
    public state: State = {
        lastUpdate: 0,
        scene: null,
        factory: null,
    };

    public finished(): void {
        //TODO
    }

    public scene(scene: Scene<Container>): void {
        this.setState({
            lastUpdate: new Date().getTime(),
            scene: scene,
            factory: this.getView(scene),
        });
    }

    private getView(scene: Scene<Container>): ViewFactory {
        if (this.isViewProvidingScene(scene)) {
            return {
                view: scene.getView(),
                instance: null,
            };
        }
        if (this.isControlledViewProvidingScene(scene)) {
            return {
                view: scene.getMvvmView(),
                instance: mvvmViewFactory,
            };
        }
        return {view: this.viewForScene(scene), instance: null};
    }

    public componentDidMount(): void {
        this.props.navigator.addNavigatorEventsListener(this);
        this.props.navigator.onStart();
    }

    public componentWillUnmount(): void {
        this.props.navigator.onStop();
        this.props.navigator.onDestroy();
    }

    private isViewProvidingScene<C extends Container>(scene: Scene<C>): scene is ViewProvidingScene<C> {
        return 'getView' in scene;
    }

    private isControlledViewProvidingScene<C extends Container>(scene: Scene<C>): scene is MvvmViewProvidingScene<C> {
        return 'getMvvmView' in scene;
    }

    private viewForScene<C extends Container>(scene: Scene<C>): SquirrelComponentClass<C> {
        throw new Error('Only view providing scenes supported');
    }

    private factory() {
        if (this.state.scene === null || this.state.factory === null) {
            //TODO
            return null;
        }
        if (this.state.factory.instance !== null) {
            return this.state.factory.instance(this.state.scene, this.state.factory.view);
        }

        return React.createElement(this.state.factory.view, {
            attach: this.state.scene.attach.bind(this.state.scene),
            detach: this.state.scene.detach.bind(this.state.scene),
        });
    }

    public render() {
        return <Fragment key={this.state.lastUpdate}>{this.factory()}</Fragment>;
    }
}
