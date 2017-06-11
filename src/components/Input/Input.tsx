import * as React from 'react';
import * as cx from 'classnames';

import {generator} from 'shell/index';

interface IProps {
    value?: string;
    type?: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: any;
    getRef?: (input) => void;
    s?: number;
}

interface IState {

}

export default class Input extends React.Component<IProps, IState> {
    elementId = generator.genId();

    componentDidMount(){
        Materialize.updateTextFields();
    }

    render() {
        const {type, s, placeholder, onChange, disabled, value, label, getRef} = this.props;
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
                       placeholder={placeholder}
                       onChange={onChange}
                       disabled={disabled}
                       value={value}
                       ref={(input) => {
                           if (getRef) getRef(input)
                       }}
                       id={this.elementId}/>
                <label htmlFor={this.elementId}>{label}</label>
            </div>
        )
    }
}