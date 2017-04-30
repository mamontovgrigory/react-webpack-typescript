import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';

import {generator} from 'shell/index';
import Button from 'components/Button/Button';

interface IModalProps {
    header?:string;
    body:any,
    buttons?:any[];
    hideDefaultButton?:boolean;
    large?:boolean
}

interface IConfirmProps {
    header?:string;
    text:string;
    confirmCallback:Function;
    closeCallback?:Function;
}

class Dialog {
    modal(properties:IModalProps):string {
        let dialogId = generator.genId();
        let modal = document.createElement('div');
        document.body.appendChild(modal);

        const classes = cx({
            'modal': true,
            'modal-fixed-footer': true,
            'modal-large': properties.large
        });

        ReactDOM.render(
            <div id={dialogId} className={classes}>
                <div className="modal-content">
                    <h4>{properties.header}</h4>
                    <div>
                        {properties.body}
                    </div>
                </div>
                <div className="modal-footer">
                    {!properties.hideDefaultButton &&
                    <button className="modal-action modal-close waves-effect waves-green btn-flat"
                            onClick={() => this.close(dialogId)}>
                        {i18next.t('close')}
                    </button>}
                    {
                        properties.buttons && properties.buttons.map((button) => {
                            return button;
                        })
                    }
                </div>
            </div>,
            modal);

        let $dialog = $('#' + dialogId);
        $dialog.modal({
            ready: function () {
                $(window).trigger('resize');
            }
        });
        $dialog.modal('open');

        return dialogId;
    }

    close(dialogId:string):void {
        let $dialog = $('#' + dialogId);
        $dialog.modal('close');
        setTimeout(function () {
            $dialog.remove();
        }, 500);
    }

    confirm(properties:IConfirmProps):void {
        let buttons = [
            {
                text: i18next.t('cancel'),
                onClick: function () {
                    if (properties.closeCallback)properties.closeCallback();
                }
            },
            {
                text: i18next.t('ok'),
                onClick: function () {
                    properties.confirmCallback();
                }
            }
        ];

        dialog.modal({
            header: properties.header,
            body: properties.text,
            hideDefaultButton: true,
            buttons: buttons.map((el, i) => {
                return <Button
                    title={el.text}
                    className="modal-action modal-close"
                    onClick={el.onClick}
                    key={i}>
                    {el.text}
                </Button>
            })
        });
    }
}

const dialog = new Dialog();

export {dialog};