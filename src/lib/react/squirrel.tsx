import * as React from 'react';
import {Fragment} from 'react';
import {Scene} from '../core/scene';
import {Container} from '../core/container';
import {Navigator} from '../core/navigator';
import {getViewFactoryForScene, ViewFactory} from './view_factory_factory';

interface OwnProps {
    navigator: Navigator.Instance;
    onFinish?: () => void;
}

interface State {
    /**
     * Contains a timestamp for every update, used as a key to force a re-render
     */
    lastUpdate: number;
    /**
     * The currently active scene
     */
    scene: Scene<Container> | null;
    /**
     * The view factory to render the current scene
     */
    factory: ViewFactory | null;
}

export class Squirrel extends React.Component<OwnProps, State> implements Navigator.Events {
    public state: State = {
        lastUpdate: 0,
        scene: null,
        factory: null,
    };

    /**
     * When a new scene is received this is called
     * @param scene
     */
    public scene(scene: Scene<Container>): void {
        this.setState({
            lastUpdate: new Date().getTime(),
            scene: scene,
            factory: getViewFactoryForScene(scene),
        });
    }

    /**
     * When navigator is finished allow the callback to propagate upwards through component tree
     */
    public finished(): void {
        if (this.props.onFinish !== undefined) {
            this.props.onFinish();
        }
    }

    /**
     * When the Squirrel component mounts in the component tree register as listener on the navigator and
     * make sure it is booted
     */
    public componentDidMount(): void {
        this.props.navigator.addNavigatorEventsListener(this);
        this.props.navigator.onStart();
    }

    /**
     * When removing the squirrel component from view make sure we stop and destroy the navigator
     */
    public componentWillUnmount(): void {
        this.props.navigator.onStop();
        this.props.navigator.onDestroy();
    }

    private renderContent() {
        if (this.state.scene === null || this.state.factory === null) {
            //TODO, maybe suspense?
            return null;
        }

        return this.state.factory.instance(this.state.scene, this.state.factory.view);
    }

    public render() {
        return <Fragment key={this.state.lastUpdate}>{this.renderContent()}</Fragment>;
    }
}
