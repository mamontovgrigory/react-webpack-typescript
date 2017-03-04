import * as React from 'react';

import {generator} from '../../shell';

interface Props {
    trigger?:any;
    header?:string;
    buttons?:any[];
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
                {this.props.trigger && React.cloneElement(
                    this.props.trigger, {
                        onClick: this.openModal.bind(this)
                    }
                )}

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
                            this.props.buttons && this.props.buttons.map((el) => {
                                return el;
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;