import * as React from 'react';

interface Props {
    title?:string;
    id?:string;
    className?:string;
    onClick?:Function;
}

interface State {

}

export default class Button extends React.Component<Props,State> {
    render(){
        let className = 'btn waves-effect waves-light m-r-5 ' + this.props.className;
        return(
            <button className={className}
                    title={this.props.title}
                    id={this.props.id}
                    onClick={this.props.onClick ? this.props.onClick.bind(this) : function(){}}>
                {this.props.children}
            </button>
        )
    }
}