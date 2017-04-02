import * as React from 'react';
import * as cx from 'classnames';

import {generator} from 'shell/index';

interface IProps{
    value?:string;
    label:string;
    disabled?:boolean;
    onChange?:any;
    s?:number;
}

interface IState{

}

export default class Textarea extends React.Component<IProps, IState>{
    elementId = generator.genId();

    render() {
        const s = 's' + (this.props.s ? this.props.s : 12);
        let classesObject = {
            'input-field': true,
            'col': true
        };
        classesObject[s] = true;
        const classes = cx(classesObject);
        return (
            <div className={classes}>
                <textarea id={this.elementId}
                          className="materialize-textarea"
                          onChange={this.props.onChange}
                          value={this.props.value}
                          disabled={this.props.disabled}/>
                <label htmlFor={this.elementId}>{this.props.label}</label>
            </div>
        )
    }
}