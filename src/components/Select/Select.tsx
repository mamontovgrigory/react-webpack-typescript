import * as React from 'react';
import * as cx from 'classnames';

import {generator} from 'shell/index';

interface IProps {
    defaultValue?:string;
    value?:string;
    label:string;
    disabled?:boolean;
    onChange?:any;
    options?:{
        value:string;
        name?:string;
    }[];
    s?:number;
}

interface IState {

}

export default class Select extends React.Component<IProps, IState> {
    elementId = generator.genId();

    componentDidMount() {
        Materialize.updateTextFields();
        let $element = $('#' + this.elementId);
        $element.material_select();

        $element.on('change', this.props.onChange.bind(this)); //TODO: Needs react realization
    }

    componentDidUpdate() {
        let $element = $('#' + this.elementId);

        $element.material_select('destroy');
        $element.material_select();
    }

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
                <select id={this.elementId}
                        defaultValue={this.props.defaultValue}
                        value={this.props.value}
                        onChange={this.props.onChange.bind(this)}>
                    {
                        this.props.options && this.props.options.map((option, i) => {
                            return (
                                <option value={option.value} key={i}>{option.name ? option.name : option.value}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor={this.elementId}>{this.props.label}</label>
            </div>
        )
    }
}