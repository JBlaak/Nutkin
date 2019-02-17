import * as React from 'react';

interface OwnProps {}

export class Block extends React.Component<OwnProps> {
    public render() {
        return (
            <div style={{float: 'left', background: 'lightpink', width: 200, height: 200, margin: 20, padding: 20}}>
                {this.props.children}
            </div>
        );
    }
}
