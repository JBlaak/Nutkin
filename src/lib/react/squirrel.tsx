import * as React from 'react';
import {Scene} from '../core/scene';
import {Container} from '../core/container';
import {ViewProvidingScene} from './view_providing_scene';
import {SquirrelComponentClass} from './squirrel_component';
import {Navigator} from '../core/navigator';

interface OwnProps {
    navigator: Navigator.Instance;
}

interface State {
    scene: Scene<Container> | null;
    view: SquirrelComponentClass<Container> | null;
}

export class Squirrel extends React.Component<OwnProps, State> implements Navigator.Events {
    public state: State = {
        scene: null,
        view: null,
    };

    public finished(): void {
        //TODO
    }

    public scene(scene: Scene<Container>): void {
        this.setState({
            scene: scene,
            view: this.isViewProvidingScene(scene) ? scene.getView() : this.viewForScene(scene),
        });
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
        return (scene as ViewProvidingScene<C>).getView !== undefined;
    }

    private viewForScene<C extends Container>(scene: Scene<C>): SquirrelComponentClass<C> {
        throw new Error('Only view providing scenes supported');
    }

    public render() {
        if (this.state.scene === null || this.state.view === null) {
            //TODO
            return null;
        }
        return React.createElement(this.state.view, {
            attach: this.state.scene.attach.bind(this.state.scene),
            detach: this.state.scene.detach.bind(this.state.scene),
        });
    }
}
