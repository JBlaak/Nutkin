import * as React from 'react';

interface LifecycleProps<C> {
    attach: (c: SquirrelComponent<C, any, any>) => void;
    detach: (c: SquirrelComponent<C, any, any>) => void;
}

export type SquirrelComponentClass<C> = new (...args: any[]) => SquirrelComponent<C, any, any>;

export abstract class SquirrelComponent<C, OwnProps = {}, State = {}> extends React.Component<
    LifecycleProps<C> & OwnProps,
    State
> {
    public componentDidMount(): void {
        this.props.attach(this);
    }

    public componentWillUnmount(): void {
        this.props.detach(this);
    }
}
