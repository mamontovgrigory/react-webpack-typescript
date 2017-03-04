class Dialog {
    modal() {
        console.log('modal');
        var modal = document.createElement('div');
        document.body.appendChild(modal);
        
        $('#modal').modal();
        $('#modal').modal();
    }

    renderOverlay(){
        return(
            <div id={'modal'} className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>{'header'}</h4>
                    <div>
                        {'children'}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-action modal-close waves-effect waves-green btn-flat">
                        {i18next.t('close')}
                    </button>
                    {
                        'buttons'
                    }
                </div>
            </div>
        )
    }
}

const dialog = new Dialog();

export {dialog};