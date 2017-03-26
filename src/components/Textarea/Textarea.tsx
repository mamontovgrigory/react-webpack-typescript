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

export default class Textarea extends React.Component<IProps, IState>{
    render(){
        let elementId = generator.genId();
        return (
            <div className="input-field col s12">
                <textarea id={elementId} 
                          className="materialize-textarea"
                          onChange={this.props.onChange}
                          value={this.props.value}
                          disabled={this.props.disabled}></textarea>
                <label htmlFor={elementId}>{this.props.label}</label>
            </div>
        )
    }
}