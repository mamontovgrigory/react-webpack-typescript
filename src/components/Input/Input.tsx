import * as React from 'react';
import * as cx from 'classnames';

import {generator} from 'shell/index';

interface IProps {
    value?:string;
    type?:string;
    label:string;
    placeholder?:string;
    disabled?:boolean;
    onChange?:any;
    s?:number;
}

interface IState {

}

export default class Input extends React.Component<IProps, IState> {
    elementId = generator.genId();

    render() {
        const {type, s, placeholder, onChange, disabled, value, label} = this.props;
        const sClassName = 's' + (s ? s : 12);
        let classesObject = {
            'input-field': true,
            'col': true
        };
        classesObject[sClassName] = true;
        const classes = cx(classesObject);
        return (
            <div className={classes}>
                <input type={type ? type : 'text'}
                       className="validate"
                       placeholder={placeholder}
                       onChange={onChange}
                       disabled={disabled}
                       value={value}
                       id={this.elementId}/>
                <label htmlFor={this.elementId}>{label}</label>
            </div>
        )
    }
}