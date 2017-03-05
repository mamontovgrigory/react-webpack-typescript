import * as React from 'react';

interface Props {
    title?:string;
    id?:string;
    onClick?:Function;
}

interface State {

}

export default class Button extends React.Component<Props,State> {
    render(){
        return(
            <button className="btn waves-effect waves-light m-r-5"
                    title={this.props.title}
                    id={this.props.id}
                    onClick={this.props.onClick ? this.props.onClick.bind(this) : function(){}}>
                {this.props.children}
            </button>
        )
    }
}