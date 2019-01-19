import * as React from 'react';
import {FunctionComponent} from 'react';
import {MvvmContainer, MvvmScene} from '../../core/scenes/mvvm_scene';
import {Scene} from '../../core/scene';
import {Container} from '../../core/container';

export function mvvmViewFactory(
    scene: Scene<Container>,
    view: FunctionComponent<any>,
) {
    return React.createElement(MvvmViewFactory, {
        view: view,
        attach: scene.attach.bind(scene),
        detach: scene.detach.bind(scene),
    });
}

export interface WithController<S > {
    controller: S;
}

interface OwnProps<S> {
    view: FunctionComponent<WithController<MvvmScene<S>>>;
    attach: (c: MvvmContainer<MvvmScene<S>>) => void;
    detach: (c: MvvmContainer<MvvmScene<S>>) => void;
}

interface State<S> {
    scene: MvvmScene<S> | null;
}

export class MvvmViewFactory<S> extends React.Component<OwnProps<S>, State<S>> implements MvvmContainer<MvvmScene<S>> {
    public state = {
        scene: null,
    };

    public componentDidMount(): void {
        console.log('componentDidMount attaching');
        this.props.attach(this);
    }

    public componentWillUnmount(): void {
        console.log('componentWillUnmount detaching');
        this.props.detach(this);
    }

    public attachTo(scene: MvvmScene<S>): void {
        console.log('attachTo', scene);
        this.setState({
            scene: scene,
        });
    }

    public detachFrom(scene: MvvmScene<S>): void {
        console.log('detachFrom', scene);
        this.setState({
            scene: null,
        });
    }

    public render() {
        const scene = this.state.scene;
        if (scene === null) {
            return null;
        }

        return React.createElement(this.props.view, {
            controller: scene,
        });
    }
}
