import * as React from 'react';

import {dialog, generator, grid} from 'shell/index';
import {getCallsDetails,getRecord} from 'redux/actions/telephonyActions';
import Button from 'components/Button/Button';
import RecordItem from './RecordItem';

interface Props {
    callsDetails?:any;
    callsDetailsProps:any;
    login:string;

    dispatch?:any;
}

interface State {
    callsDetails?:any;
}

export default class CallsDetails extends React.Component<Props, State> {
    constructor(props){
        super();

        this.state = {
            callsDetails: props.callsDetails
        };
    }
    gridId:string = generator.genId();

    componentDidMount() {
        let initGrid = this.initGrid.bind(this);
        setTimeout(function () {
            initGrid();
        }, 200);
    }

    componentDidUpdate(){
        let initGrid = this.initGrid.bind(this);
        initGrid();
    }

    initGrid() {
        console.log('initGrid', this.state.callsDetails);
        grid.init({
            gridId: this.gridId,
            data: this.state.callsDetails.map((r) => {
                r.id = r.callid;
                return r;
            }),
            colModel: [
                {
                    name: 'id',
                    hidden: true,
                    key: true
                },
                {
                    name: 'time',
                    label: i18next.t('dateAndTime')
                },
                {
                    name: 'numfrom',
                    label: i18next.t('outgoing')
                },
                {
                    name: 'numto',
                    label: i18next.t('incoming')
                },
                {
                    name: 'duration',
                    label: i18next.t('duration')
                },
                {
                    name: 'mark',
                    label: i18next.t('mark'),
                    editable: true
                },
                {
                    name: 'model',
                    label: i18next.t('model'),
                    editable: true
                },
                {
                    name: 'comment',
                    label: i18next.t('comment'),
                    editable: true
                },
                {
                    name: 'useful',
                    hidden: true
                },
                {
                    name: 'useful-icon',
                    label: i18next.t('useful'),
                    edittype: "checkbox",
                    formatter: function (cellvalue, options, rowObject) {
                        let useful = rowObject.useful;
                        if (useful) {
                            let iconType = useful === 'true' ? 'done' : 'not_interested';
                            return '<i class="material-icons">' + iconType + '</i>'
                        } else {
                            return '';
                        }
                    },
                    editable: true
                },
                {
                    name: 'record',
                    label: i18next.t('record'),
                    classes: 'record-link',
                    width: 400,
                    formatter: function (cellvalue, options, rowObject) {
                        if (rowObject.id) {
                            return '<a data-callid="' + rowObject.id + '" data-time="' + rowObject.time + '">' +
                                i18next.t('load') +
                                '</a>';
                        } else {
                            return i18next.t('noRecord');
                        }
                    }
                },
                {
                    name: 'download',
                    label: i18next.t('download'),
                    classes: 'download'
                }
            ],
            multiselect: false
        });

        let $grid = $('#' + this.gridId);
        let self = this;
        $grid.on('click', '.record-link a', function () { //TODO: escape jquery methods
            let callid = $(this).data('callid');
            let time = $(this).data('time');
            self.loadRecord(callid, time);
        });
    }

    updateCallsDetailsGrid(){//TODO: Escape code doubling
        let self = this;
        let callsDetailsProps = this.props.callsDetailsProps;
        this.props.dispatch(getCallsDetails(callsDetailsProps, function(callsDetails){
            self.setState({
                callsDetails: callsDetails
            })
        }));
    }

    editClickHandler() {
        let rowsIds = grid.getSelectedRows(this.gridId);

        if (rowsIds.length === 1) {
            let callDetails = grid.getData({
                gridId: this.gridId,
                rowId: _.first(rowsIds)
            });
            let saveButtonId = generator.genId();
            dialog.modal({
                header: this.props.login + callDetails.time,
                body: <RecordItem callDetails={callDetails}
                                  updateCallsDetailsGrid={this.updateCallsDetailsGrid.bind(this)}
                                  saveButtonId={saveButtonId}
                                  dispatch={this.props.dispatch}/>,
                buttons: [
                    <Button id={saveButtonId}>{i18next.t('save')}</Button>
                ]
            });
        } else {
            dialog.modal({
                header: i18next.t('chooseOneRow'),
                body: i18next.t('pleaseChooseOneRowToEdit')
            });
        }
    }

    loadRecord(callid, time) {
        let recordName = this.props.login + ' ' + time;
        this.props.dispatch(getRecord({
            login: this.props.login,
            callid
        }, function (result) {
            let src = (NODE_ENV.trim() === 'development' ?
                    'http://ramazanavtsinov.myjino.ru' :
                    window.location.origin) + '/ajax' + result.src; //TODO: Move to config

            let $element = $('[data-callid="' + callid + '"]');
            let audioId = generator.genId();


            $element.replaceWith($('<audio>', {//TODO: needs optimization
                'id': audioId,
                'src': src
            }));

            $('#' + callid).find('.download').append($('<a>', {
                download: recordName,
                href: src,
                html: i18next.t('download')
            }));

            $('#' + audioId).audioPlayer();
        }));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Button title={i18next.t('edit')}
                            onClick={this.editClickHandler.bind(this)}>
                        <i className="material-icons">mode_edit</i>
                    </Button>
                </div>
                <div className="row">
                    <table id={this.gridId}/>
                </div>
            </div>
        )
    }
}