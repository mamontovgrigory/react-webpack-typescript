import * as React from 'react';
import * as cx from 'classnames';

import {generator} from '../../shell/generator';

interface IProps {
    value?:string;
    source:{
        [key:string]:{
            id:string;
            text:string;
        }[]
    };
    label:string;
    placeholder?:string;
    disabled?:boolean;
    onChange?:any;
    s?:number;
}

interface IState {

}

export default class Combobox extends React.Component<IProps, IState> {
    elementId = generator.genId();
    dropdownId = generator.genId();

    componentDidMount() {
        let $element = $('#' + this.elementId);
        $element.on('change', this.props.onChange.bind(this)); //TODO: Needs react realization
        this.initAutocomplete();
    }

    initAutocomplete() {
        let $element = $('#' + this.elementId);
        let dropdownId = this.dropdownId;
        var single = $element.materialize_autocomplete({
            multiple: {
                enable: false
            },
            dropdown: {
                el: '#' + dropdownId
            },
            onSelect: function(){
                $element.trigger('change');
            }
        });

        single.resultCache = this.props.source;
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
                <div className="autocomplete" id="single">
                    <div className="ac-input">
                        <input type="text"
                               placeholder={this.props.placeholder}
                               onChange={this.props.onChange}
                               disabled={this.props.disabled}
                               value={this.props.value}
                               id={this.elementId}
                               data-activates={this.dropdownId}
                               data-beloworigin="true"
                               autoComplete="off"/>
                    </div>
                    <ul id={this.dropdownId} className="dropdown-content ac-dropdown"/>
                </div>
                <label className="active" htmlFor={this.elementId}>{this.props.label}</label>
            </div>
        );
    }
}