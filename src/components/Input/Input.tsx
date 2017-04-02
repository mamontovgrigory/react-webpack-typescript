import * as React from 'react';
import * as cx from 'classnames';

import {generator} from 'shell/index';

interface IProps {
    value?:string;
    label:string;
    disabled?:boolean;
    onChange?:any;
    s?:number;
}

interface IState {

}

export default class Input extends React.Component<IProps, IState> {
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
                <input type="text"
                       className="validate"
                       onChange={this.props.onChange}
                       disabled={this.props.disabled}
                       value={this.props.value}
                       id={this.elementId}/>
                <label htmlFor={this.elementId}>{this.props.label}</label>
            </div>
        )
    }
}