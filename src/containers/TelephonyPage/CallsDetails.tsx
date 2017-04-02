import * as React from 'react';
import * as moment from 'moment';

import {IUserPermissions} from 'models/account';
import {dialog, generator, grid} from 'shell/index';
import {getCallsDetails, getRecord, saveComments} from 'redux/actions/telephonyActions';
import Button from 'components/Button/Button';
import RecordItem from './RecordItem';

interface Props {
    userPermissions:IUserPermissions;
    callsDetails?:any;
    callsDetailsProps:any;
    login:string;

    dispatch?:any;
}

interface State {
    callsDetails?:any;
}

export default class CallsDetails extends React.Component<Props, State> {
    constructor(props) {
        super();

        this.state = {
            callsDetails: props.callsDetails
        };
    }

    gridId:string = generator.genId();

    objectiveOptions = [
        {
            value: ''
        },
        {
            value: i18next.t('yes')
        },
        {
            value: i18next.t('no')
        }
    ];

    componentDidMount() {
        let initGrid = this.initGrid.bind(this);
        setTimeout(function () {
            initGrid();
        }, 200);
    }

    componentDidUpdate() {
        let initGrid = this.initGrid.bind(this);
        initGrid();
    }

    initGrid() {
        const gridId = this.gridId;
        const dispatch = this.props.dispatch;
        const objectiveOptions = this.objectiveOptions.map((o) => {
            return o.value;
        });
        const telephonyCommentsManage = this.props.userPermissions.telephonyCommentsManage;
        grid.init({
            gridId: gridId,
            data: this.state.callsDetails,
            colModel: [
                {
                    name: 'id',
                    hidden: true
                },
                {
                    name: 'callid',
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
                    label: i18next.t('duration'),
                    formatter: function (cellvalue, options, rowObject) {
                        return moment(parseInt(cellvalue) * 1000).utc().format('HH:mm:ss');
                    }
                },
                {
                    name: 'mark',
                    label: i18next.t('mark'),
                    editable: true,
                    hidden: !this.props.userPermissions.telephonyCommentsView
                },
                {
                    name: 'model',
                    label: i18next.t('model'),
                    editable: true,
                    hidden: !this.props.userPermissions.telephonyCommentsView
                },
                {
                    name: 'comment',
                    label: i18next.t('comment'),
                    editable: true,
                    hidden: !this.props.userPermissions.telephonyCommentsView
                },
                {
                    name: 'objective',
                    label: i18next.t('objective'),
                    editable: true,
                    edittype: 'select',
                    editoptions: {value: objectiveOptions},
                    hidden: !this.props.userPermissions.telephonyCommentsView
                },
                {
                    name: 'record',
                    label: i18next.t('record'),
                    classes: 'record-link',
                    width: 400,
                    formatter: function (cellvalue, options, rowObject) {
                        if (parseInt(rowObject.duration) > 0) {
                            return '<a data-callid="' + rowObject.callid + '" data-time="' + rowObject.time + '">' +
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
            multiselect: false,
            ondblClickRow: function (rowId) {
                if (telephonyCommentsManage) {
                    let editingRowIdData = 'editing-row-id';
                    let editingRowId = $grid.data(editingRowIdData);
                    grid.restoreRow({
                        gridId: gridId,
                        rowId: editingRowId
                    });
                    if (rowId !== editingRowId) {
                        grid.editRow({
                            gridId: gridId,
                            rowId: rowId,
                            parameters: {
                                keys: true,
                                aftersavefunc: function (r, s, rowData) {
                                    dispatch(saveComments({
                                        id: rowData.id,
                                        mark: rowData.mark,
                                        model: rowData.model,
                                        comment: rowData.comment,
                                        objective: rowData.objective
                                    }));
                                }
                            }
                        });
                        $grid.data(editingRowIdData, rowId);
                    } else {
                        $grid.data(editingRowIdData, null);
                    }
                }
            }
        });

        let $grid = $('#' + this.gridId);
        let self = this;
        $grid.on('click', '.record-link a', function () { //TODO: escape jquery methods
            let callid = $(this).data('callid');
            let time = $(this).data('time');
            self.loadRecord(callid, time);
        });
    }

    updateCallsDetailsGrid() {//TODO: Escape code doubling
        let self = this;
        let callsDetailsProps = this.props.callsDetailsProps;
        this.props.dispatch(getCallsDetails(callsDetailsProps, function (callsDetails) {
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
                                  login={this.props.login}
                                  objectiveOptions={this.objectiveOptions}
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
        }, function (record) {
            let $element = $('[data-callid="' + callid + '"]');
            let audioId = generator.genId();

            $element.replaceWith($('<audio>', {//TODO: needs optimization
                'id': audioId,
                'src': record.src
            }));

            $('#' + callid).find('.download').append($('<a>', {
                download: recordName,
                href: record.src,
                html: i18next.t('download')
            }));

            $('#' + audioId).audioPlayer();
        }));
    }

    render() {
        return (
            <div>
                {this.props.userPermissions.telephonyCommentsManage &&
                <div className="row">
                    <Button title={i18next.t('edit')}
                            onClick={this.editClickHandler.bind(this)}>
                        <i className="material-icons">mode_edit</i>
                    </Button>
                </div>}
                <div className="row">
                    <table id={this.gridId}/>
                </div>
            </div>
        )
    }
}