import * as ReactDOM from 'react-dom';

import {generator} from './index.ts';

interface ModalProps {
    header?:string;
    body:any,
    buttons?:any[];
}

class Dialog {
    modal(properties:ModalProps):string {
        let dialogId = generator.genId();
        var modal = document.createElement('div');
        document.body.appendChild(modal);

        ReactDOM.render(
            <div id={dialogId} className={'modal modal-fixed-footer'}>
                <div className="modal-content">
                    <h4>{properties.header}</h4>
                    <div>
                        {properties.body}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-action modal-close waves-effect waves-green btn-flat">
                        {i18next.t('close')}
                    </button>
                    {
                        properties.buttons && properties.buttons.map((button) => {
                            return button;
                        })
                    }
                </div>
            </div>,
            modal);

        $('#' + dialogId).modal();
        $('#' + dialogId).modal('open');

        return dialogId;
    }
}

const dialog = new Dialog();

export {dialog};