import * as React from 'react';

import {generator} from 'shell/index';

interface IProps{
    value?:string;
    label:string;
    disabled?:boolean;
    onChange?:any;
}

interface IState{

}

export default class Input extends React.Component<IProps, IState>{
    render(){
        let elementId = generator.genId();
        return (
            <div className="input-field col s12">
                <input type="text"
                       className="validate"
                       onChange={this.props.onChange}
                       disabled={this.props.disabled}
                       value={this.props.value}
                       id={elementId}/>
                <label htmlFor={elementId}>{this.props.label}</label>
            </div>
        )
    }
}