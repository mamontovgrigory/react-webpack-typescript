import * as React from 'react';

import {generator} from '../../shell';

interface Props {
    trigger?:any;
    header?:string;
    buttons?:{
        text:string;
    }[];
    dispatch?:any;
}

interface State {
    modalId?:string;
}

class Modal extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            modalId: generator.genId()
        }
    }

    componentDidMount() {
        $('#' + this.state.modalId).modal();
    }

    openModal() {
        $('#' + this.state.modalId).modal('open');
    }

    render() {
        return ( //TODO: render modal on trigger click
            <div style={{display: 'inline-block'}}>
                {React.cloneElement(
                    this.props.trigger, {
                        onClick: this.openModal.bind(this)
                    }
                ) || <a className="modal-trigger waves-effect waves-light btn" href="#modal1">Modal</a>}

                <div id={this.state.modalId} className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>{this.props.header}</h4>
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-action modal-close waves-effect waves-green btn-flat">
                            {i18next.t('close')}
                        </button>
                        {
                            this.props.buttons && this.props.buttons.map((el, i) => {
                                return (
                                    <button className="waves-effect waves-green btn-flat" key={i}>
                                        {el.text}
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;