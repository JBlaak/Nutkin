import * as React from 'react';

/**
 * These properties allow a Squirrel component to propagate their lifecycle.
 * they are, however, optional to able the subclassed component to render on its own
 */
interface LifecycleProps<C> {
    attach?: (c: SquirrelComponent<C, any, any>) => void;
    detach?: (c: SquirrelComponent<C, any, any>) => void;
}

export type SquirrelComponentClass<C> = new (...args: any[]) => SquirrelComponent<C, any, any>;

export abstract class SquirrelComponent<C, OwnProps = {}, State = {}> extends React.Component<
    LifecycleProps<C> & OwnProps,
    State
> {
    public componentDidMount(): void {
        if (this.props.attach) {
            this.props.attach(this);
        }
    }

    public componentWillUnmount(): void {
        if (this.props.detach) {
            this.props.detach(this);
        }
    }
}
