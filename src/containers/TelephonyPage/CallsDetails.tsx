import * as React from 'react';
import * as moment from 'moment';

import { IUserPermissions } from 'models/account';
import { ICallDetails } from 'models/telephony';
import { dialog, generator, grid } from 'shell/index';
import { getCallsDetails, getRecord, saveComments, getUniqueComments } from 'redux/actions/telephonyActions';
import Button from 'components/Button/Button';
import RecordItem from './RecordItem';
import i18n = require("i18next");

interface Props {
    userPermissions: IUserPermissions;
    callsDetails?: ICallDetails[];
    callsDetailsProps: any;

    dispatch?: any;
}

interface State {
    callsDetails?: ICallDetails[];
}

export default class CallsDetails extends React.Component<Props, State> {
    constructor(props) {
        super();

        this.state = {
            callsDetails: props.callsDetails
        };
    }

    gridId: string = generator.genId();

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
        const {dispatch, userPermissions} = this.props;
        const {callsDetails} = this.state;

        const gridId = this.gridId;
        const objectiveOptions = this.objectiveOptions.map((o) => {
            return o.value;
        });
        const telephonyCommentsManage = userPermissions.telephonyCommentsManage;
        let defaultSearchOptions = {
            '': i18next.t('selectAll')
        };
        let numFromSearchOptions = _.assign({}, defaultSearchOptions);
        let numToSearchOptions = _.assign({}, defaultSearchOptions);
        callsDetails.map((c) => {
            numFromSearchOptions[c.numfrom] = c.numfrom;
            numToSearchOptions[c.numto] = c.numto;
        });
        grid.init({
            gridId: gridId,
            data: callsDetails,
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
                    name: 'login',
                    hidden: true
                },
                {
                    name: 'loginId',
                    hidden: true
                },
                {
                    name: 'time',
                    label: i18next.t('dateAndTime'),
                    width: 120
                },
                {
                    name: 'numfrom',
                    label: i18next.t('outgoing'),
                    width: 120,
                    formatter: 'select',
                    stype: 'select',
                    searchoptions: {
                        value: numFromSearchOptions
                    }
                },
                {
                    name: 'numto',
                    label: i18next.t('incoming'),
                    width: 120,
                    formatter: 'select',
                    stype: 'select',
                    searchoptions: {
                        value: numToSearchOptions
                    }
                },
                {
                    name: 'duration',
                    label: i18next.t('duration'),
                    width: 60,
                    formatter: function (cellvalue, options, rowObject) {
                        return moment(parseInt(cellvalue) * 1000).utc().format('HH:mm:ss');
                    }
                },
                {
                    name: 'mark',
                    label: i18next.t('mark'),
                    editable: true,
                    hidden: !userPermissions.telephonyCommentsView,
                    width: 60
                },
                {
                    name: 'model',
                    label: i18next.t('model'),
                    editable: true,
                    hidden: !userPermissions.telephonyCommentsView,
                    width: 60
                },
                {
                    name: 'comment',
                    label: i18next.t('comment'),
                    width: 200,
                    editable: true,
                    hidden: !userPermissions.telephonyCommentsView
                },
                {
                    name: 'objective',
                    label: i18next.t('objective'),
                    editable: true,
                    edittype: 'select',
                    editoptions: {value: objectiveOptions},
                    hidden: !userPermissions.telephonyCommentsView,
                    width: 60
                },
                {
                    name: 'record',
                    label: i18next.t('record'),
                    classes: 'record-link',
                    formatter: function (cellvalue, options, rowObject) {
                        if (parseInt(rowObject.duration) > 0) {
                            return '<a data-callid="' + rowObject.callid + '" data-login="' + rowObject.login + '" data-time="' + rowObject.time + '">' +
                                i18next.t('load') +
                                '</a>';
                        } else {
                            return i18next.t('noRecord');
                        }
                    },
                    width: 150
                },
                {
                    name: 'download',
                    label: i18next.t('download'),
                    classes: 'download',
                    width: 60
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
                                        id: rowData.callid,
                                        loginId: rowData.loginId,
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
            let login = $(this).data('login');
            let time = $(this).data('time');
            self.loadRecord({callid, login, time});
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
        const {dispatch} = this.props;
        const {callsDetails} = this.state;

        const objectiveOptions = this.objectiveOptions;
        const updateCallsDetailsGrid = this.updateCallsDetailsGrid.bind(this);

        if (rowsIds.length === 1) {
            let callDetails = _.find(callsDetails, function (c) {
                return c.callid === _.first(rowsIds);
            });
            let saveButtonId = generator.genId();
            if (callDetails) {
                dispatch(getUniqueComments({
                    loginId: callDetails.loginId
                }, function (comments) {
                    dialog.modal({
                        header: callDetails.login + callDetails.time,
                        body: <RecordItem callDetails={callDetails}
                                          login={callDetails.login}
                                          clientId={callDetails.loginId}
                                          objectiveOptions={objectiveOptions}
                                          updateCallsDetailsGrid={updateCallsDetailsGrid}
                                          saveButtonId={saveButtonId}
                                          uniqueComments={comments}
                                          dispatch={dispatch}/>,
                        buttons: [
                            <Button id={saveButtonId}>{i18next.t('save')}</Button>
                        ]
                    });
                }));
            }
        } else {
            dialog.modal({
                header: i18next.t('chooseOneRow'),
                body: i18next.t('pleaseChooseOneRowToEdit')
            });
        }
    }

    loadRecord(data) {
        const {dispatch} = this.props;
        const {callid, login, time} = data;

        let recordName = login + ' ' + time;
        dispatch(getRecord({
            login: login,
            callid
        }, function (record) {
            let $element = $('[data-callid="' + callid + '"]');
            let audioId = generator.genId();

            $element.replaceWith($('<audio>', {//TODO: needs optimization
                'id': audioId,
                'src': record.src
            }));

            $('#' + callid).find('.download').append($('<a>', {
                download: recordName + '.mp3',
                href: record.src,
                html: i18next.t('download'),
                target: '_blank'
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