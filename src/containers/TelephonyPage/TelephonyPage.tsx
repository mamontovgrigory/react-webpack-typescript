import * as React from 'react';
import * as moment from 'moment';
import {connect} from 'react-redux';

import {generator, dialog} from 'shell/index';
import {
    getUpdateDate,
    setClients,
    getCallsTotals,
    getCallsDetails
} from 'redux/actions/telephonyActions';
import CallsDetails from './CallsDetails';

const style = require('./telephonyPage.scss'); //TODO: use classes as variables

interface Props {
    updateDate?:string;
    clients?:any[];
    groups?:any[];
    callsTotals:any;

    dispatch?:any;
}

interface State {
    from?:string; //TODO: Move all state parameters to redux
    to?:string;
    duration?:number;
}

class Telephony extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            from: moment().add(-7, 'days').format(this.dateFormat),
            to: moment().format(this.dateFormat)
        };
    }

    inputFromId = generator.genId();
    inputToId = generator.genId();
    inputDurationId = generator.genId();
    divClientsListId = generator.genId();
    dateFormat = 'DD.MM.YYYY'; //TODO: Move to config

    componentWillMount() {
        this.props.dispatch(getUpdateDate());
    }

    componentDidMount() {
        var self = this;

        $('#' + this.inputFromId).pickadate({
            format: this.dateFormat,
            onSet: function (result) {
                var date = result.select;
                self.setState({
                    from: moment(date).format(self.dateFormat)
                });
            }
        });
        $('#' + this.inputToId).pickadate({
            format: this.dateFormat,
            onSet: function (result) {
                var date = result.select;
                self.setState({
                    to: moment(date).format(self.dateFormat)
                });
            }
        });
        Materialize.updateTextFields();
    }

    componentDidUpdate() {
        Materialize.updateTextFields();
    }

    durationChangeHandler(e) {
        this.setState({
            duration: e.target.value
        });
    }

    selectAllChangeHandler(e) {
        let clients = this.props.clients.map((el) => {
            el.checked = e.target.checked;
            return el;
        });
        this.props.dispatch(setClients(clients));
    }

    groupChangeHandler(ids, e) {
        let clients = this.props.clients.map((el) => {
            el.checked = ids.indexOf(el.id) !== -1 ? e.target.checked : el.checked;
            return el;
        });
        this.props.dispatch(setClients(clients));
    }

    clientCheckboxChangeHandler(e) {
        let id = e.target.value;
        let clients = this.props.clients.map((el) => {
            el.checked = el.id === id ? e.target.checked : el.checked;
            return el;
        });
        this.props.dispatch(setClients(clients));
    }

    getRequestParams() {
        return {
            from: this.state.from,
            to: this.state.to,
            loginIds: this.props.clients.filter((client) => {
                return client.checked;
            }).map((client) => {
                return client.id;
            }),
            duration: this.state.duration
        };
    }

    searchClickHandler() {
        $('#' + this.divClientsListId).slideUp();
        this.props.dispatch(getCallsTotals(this.getRequestParams()));
    }

    reportClickHandler() {
        let serverUrl = (NODE_ENV.trim() === 'development' ?
            'http://ramazanavtsinov.myjino.ru' :
            window.location.origin); //TODO: Move to config

        window.location.href = serverUrl + '/ajax/get_report.php?' + $.param(this.getRequestParams());
    }

    slideClickHandler() {
        $('#' + this.divClientsListId).slideToggle();
    }

    infoCellClickHandler(login, date, duration) {
        var clientObj = _.find(this.props.clients, function (c) {
            return c.login === login;
        });

        let dateFormat = this.dateFormat;
        let dispatch = this.props.dispatch;
        let callsDetailsProps = {
            loginId: clientObj.id,
            date: date,
            duration: duration
        };
        this.props.dispatch(getCallsDetails(callsDetailsProps, function (result) {
            dialog.modal({
                header: login + ' ' + moment(date).format(dateFormat),
                body: <CallsDetails callsDetails={result}
                                    dispatch={dispatch}
                                    login={login}
                                    callsDetailsProps={callsDetailsProps}/>,
                large: true
            });
        }));
    }

    render() {
        let daysTotals = [];
        let selectAllChecked = this.props.clients.length === this.props.clients.filter((client) => {
                return client.checked;
            }).length;
        return (
            <div className={'telephony'}>
                <div className="row">
                    <div className="input-field col s3">
                        <input type="date" id={this.inputFromId} className="datepicker"
                               value={this.state.from}/>
                        <label htmlFor="date-from" className="active">{i18next.t('periodFrom')}</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="date" id={this.inputToId} className="datepicker"
                               value={this.state.to}/>
                        <label htmlFor="date-to" className="active">{i18next.t('periodTo')}</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="number" id={this.inputDurationId}
                               onChange={this.durationChangeHandler.bind(this)}/>
                        <label htmlFor={this.inputDurationId}>{i18next.t('durationInSeconds')}</label>
                    </div>
                    <div className="col s3 note">
                        {this.props.updateDate && i18next.t('updated') + ' ' + this.props.updateDate}
                    </div>
                </div>
                <div id={this.divClientsListId}>
                    <div className="row">
                        <div className="col a12">
                            <div className="divider"></div>
                            <h4>{i18next.t('clients')}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s3">
                            <input type="checkbox" id={"select-all"}
                                   checked={selectAllChecked}
                                   onChange={this.selectAllChangeHandler.bind(this)}/>
                            <label htmlFor={"select-all"}>{i18next.t('selectAll')}</label>
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.props.groups.map((group) => {
                                let checkboxId = generator.getHash(group.name);
                                let checked = _.intersection(group.ids, this.props.clients.filter((client) => {
                                        return client.checked;
                                    }).map((client) => {
                                        return client.id;
                                    })).length === group.ids.length;
                                return (
                                    <div className="input-field col s3" key={checkboxId}>
                                        <input type="checkbox" id={checkboxId}
                                               checked={checked}
                                               onChange={this.groupChangeHandler.bind(this, group.ids)}/>
                                        <label htmlFor={checkboxId}>{group.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row">
                        {
                            this.props.clients && this.props.clients.map((client) => {
                                let checkboxId = generator.getHash(client.id);
                                return (
                                    <div className="input-field col s3" key={checkboxId}>
                                        <input type="checkbox" id={checkboxId}
                                               value={client.id}
                                               checked={client.checked}
                                               onChange={this.clientCheckboxChangeHandler.bind(this)}/>
                                        <label htmlFor={checkboxId}>{client.login}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="clear">
                    <a className="waves-effect waves-light btn right m-l-10"
                       onClick={this.searchClickHandler.bind(this)}>{i18next.t('search')}</a>
                    <a className="waves-effect waves-light btn right m-l-10"
                       onClick={this.reportClickHandler.bind(this)}>{i18next.t('report')}</a>
                    <a className="waves-effect waves-light btn right"
                       onClick={this.slideClickHandler.bind(this)}>
                        <i className="material-icons">swap_vert</i>
                    </a>
                </div>
                <div className="overflow-auto clear-both p-t-10">
                    <table hidden={this.props.callsTotals.dates.length === 0} className="bordered">
                        <tbody>
                        <tr>
                            <th>{i18next.t('clients')}</th>
                            {
                                this.props.callsTotals.dates.map((el, index) => {
                                    if (!_.has(daysTotals, index)) daysTotals[index] = 0;
                                    return (
                                        <th key={index}>{moment(el).format(this.dateFormat)}</th>
                                    )
                                })
                            }
                            <th>{i18next.t('total')}</th>
                        </tr>
                        {
                            this.props.callsTotals.data && Object.keys(this.props.callsTotals.data).map((login, index) => {
                                var loginData = this.props.callsTotals.data[login];
                                var clientTotal = 0;
                                return (
                                    <tr key={index}>
                                        <td>{login}</td>
                                        {
                                            loginData.map((el, i) => {
                                                var count = parseInt(el);
                                                daysTotals[i] += count;
                                                clientTotal += count;
                                                var className = count !== 0 ? 'info-cell' : '';
                                                var duration = this.state.duration;
                                                return <td className={'center ' + className}
                                                           key={i}
                                                           onClick={parseInt(el) ? () =>
                                                           this.infoCellClickHandler(login,
                                                           this.props.callsTotals.dates[i], duration) : function () {
                                                           }}>{el}</td>
                                            })
                                        }
                                        {
                                            <th className="center">{clientTotal}</th>
                                        }
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <th>{i18next.t('total')}</th>
                            {
                                daysTotals.map((el, i) => {
                                    return (
                                        <th key={i} className="center">{el}</th>
                                    )
                                })
                            }
                            <th className="center">{_.reduce(daysTotals, function (sum, n) {
                                return sum + n;
                            }, 0)}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {updateDate, clients, groups, loginIds, callsTotals, callsDetails} = state.telephony;

    return {updateDate, clients, groups, loginIds, callsTotals, callsDetails};
}

export default connect(mapStateToProps)(Telephony);