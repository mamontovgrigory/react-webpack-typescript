import * as React from 'react';

import {generator} from 'shell/index';

interface IProps{
    checked?:boolean;
    label:string;
    disabled?:boolean;
    onChange?:any;
}

interface IState{

}

export default class Checkbox extends React.Component<IProps, IState>{
    render(){
        let elementId = generator.genId();
        return (
            <div className="input-field col s12">
                <input type="checkbox" id={elementId}
                       checked={this.props.checked}
                       onChange={this.props.onChange}
                       disabled={this.props.disabled}/>
                <label htmlFor={elementId}>{this.props.label}</label>
            </div>
        )
    }
}