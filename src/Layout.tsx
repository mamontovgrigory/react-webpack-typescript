import * as React from "react";
import { Link } from 'react-router';

export interface LayoutProps { }

export class Layout extends React.Component<LayoutProps, {}>{
    render(){
        return (
            <div>
                <h1>Lalala</h1>
                <div>
                    <Link to="/">Hello</Link>
                    <Link to="test">Test</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}