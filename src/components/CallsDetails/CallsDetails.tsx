import * as React from 'react';

import {dialog, generator, grid} from 'shell/index';
import {getRecord} from 'redux/actions/telephonyActions';
import Record from '../Record';

interface Props {
    callsDetails?:any;
    login:string;

    dispatch?:any;
}

interface State {

}

export default class CallsDetails extends React.Component<Props, State> {
    gridId:string = generator.genId();

    componentDidMount() {
        let initGrid = this.initGrid.bind(this);
        setTimeout(function () {
            initGrid();
        }, 200);
    }

    initGrid() {
        grid.init({
            gridId: this.gridId,
            data: _.map(this.props.callsDetails, function (r) {
                return {
                    id: r.callid,
                    time: r.time,
                    numfrom: r.numfrom,
                    numto: r.numto,
                    duration: r.duration
                };
            }),
            colModel: [
                {
                    name: 'id',
                    hidden: true
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
                    name: 'record',
                    label: i18next.t('record'),
                    classes: 'record-link',
                    formatter: function (cellvalue, options, rowObject) {
                        return '<a data-callid="' + rowObject.id + '" data-time="' + rowObject.time + '">' +
                            i18next.t('load') +
                            '</a>';
                    }
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

    loadRecord(callid, time) {
        let recordName = this.props.login + ' ' + time;
        this.props.dispatch(getRecord({
            login: this.props.login,
            callid
        }, function (result) {
            let src = (NODE_ENV.trim() === 'development' ?
                    'http://ramazanavtsinov.myjino.ru' :
                    window.location.origin) + '/ajax' + result.src; //TODO: Move to config
            dialog.modal({
                header: recordName,
                body: <Record src={src} recordName={recordName}/>
            })
        }));
    }

    render() {
        return (
            <div>
                <table id={this.gridId}/>
            </div>
        )
    }
}