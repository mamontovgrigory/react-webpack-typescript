import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';

import { IUserPermissions } from 'models/account';
import { IClient, IClientGroup, ICallsTotals } from 'models/telephony';
import { dialog, formatter, generator } from 'shell/index';
import {
    getUpdateDate,
    setClients,
    getCallsTotals,
    getCallsDetails
} from 'redux/actions/telephonyActions';
import CallsDetails from './CallsDetails';

const style = require('./telephonyPage.scss'); //TODO: use classes as variables

interface Props {
    userPermissions?: IUserPermissions;
    updateDate?: string;
    clients?: IClient[];
    groups?: IClientGroup[];
    callsTotals: ICallsTotals;

    dispatch?: any;
}

interface State {
    from?: string; //TODO: Move all state parameters to redux
    to?: string;
    duration?: number;
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
        const {groups} = this.props;
        let clients = this.props.clients.map((el) => {
            el.checked = e.target.checked;
            return el;
        });
        this.props.dispatch(setClients(clients, groups));
    }

    groupChangeHandler(ids, e) {
        const {groups} = this.props;
        let clients = this.props.clients.map((el) => {
            el.checked = ids.indexOf(el.id) !== -1 ? e.target.checked : el.checked;
            return el;
        });
        this.props.dispatch(setClients(clients, groups));
    }

    clientCheckboxChangeHandler(e) {
        const {groups} = this.props;
        let id = parseInt(e.target.value);
        let clients = this.props.clients.map((el) => {
            el.checked = parseInt(el.id) === id ? e.target.checked : el.checked;
            return el;
        });
        this.props.dispatch(setClients(clients, groups));
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
            'http://localhost:8889' :
            window.location.origin); //TODO: Move to config

        window.location.href = serverUrl + '/Api/Reports/GetStatistic?' + $.param(this.getRequestParams());
    }

    slideClickHandler() {
        $('#' + this.divClientsListId).slideToggle();
    }

    infoCellClickHandler(data: { logins: string[], from: string, to: string, duration?: number }) {
        const {userPermissions, dispatch, clients} = this.props;
        const {logins, from, to, duration} = data;

        const loginIds = clients.filter((c) => {
            return logins.indexOf(c.login) !== -1;
        }).map((c) => {
            return Number(c.id);
        });

        const dateFormat = this.dateFormat;
        const callsDetailsProps = {
            loginIds,
            from: from + ' 00:00:00',
            to: to + ' 23:59:59',
            duration: duration
        };

        dispatch(getCallsDetails(callsDetailsProps, function (result) {
            dialog.modal({
                header: logins.join(', ') + ' ' + moment(from).format(dateFormat) + ' - ' + moment(to).format(dateFormat),
                body: <CallsDetails loginIds={loginIds}
                                    callsDetails={result}
                                    userPermissions={userPermissions}
                                    dispatch={dispatch}
                                    callsDetailsProps={callsDetailsProps}/>,
                large: true
            });
        }));
    }

    render() {
        let daysTotals = [];
        let daysTotalsObjective = [];
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
                            <div className="divider"/>
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
                    {
                        this.props.groups.map((group) => {
                            let groupClients = this.props.clients.filter((client) => {
                                return group.ids.indexOf(client.id) !== -1;
                            });
                            groupClients = _.sortBy(groupClients, [function (c) {
                                const name = c.alias ? c.alias : c.login;
                                return name.toLowerCase();
                            }]);
                            return (
                                <div className="row">
                                    <hr/>
                                    {
                                        groupClients.map((client) => {
                                            let checkboxId = generator.getHash(client.id.toString());
                                            const separator = ',';
                                            return (
                                                <div className="input-field col s3 card-wrapper" key={checkboxId}>
                                                    <input type="checkbox" id={checkboxId}
                                                           value={client.id}
                                                           checked={client.checked}
                                                           onChange={this.clientCheckboxChangeHandler.bind(this)}/>
                                                    <label
                                                        htmlFor={checkboxId}>{client.alias ? client.alias : client.login}
                                                        <br/>
                                                        {client.numbers && client.numbers.split(separator).map((number, i) => {
                                                            return (
                                                                <div className="note" key={i}>
                                                                    {formatter.formatPhoneNumber(number)}
                                                                </div>
                                                            );
                                                        })}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
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
                <div className="table-wrapper clear-both p-t-10">
                    <table hidden={this.props.callsTotals.dates.length === 0} className="bordered">
                        <tbody>
                        <tr>
                            <th className="head-column">{i18next.t('clients')}</th>
                            {
                                this.props.callsTotals.dates.map((el, index) => {
                                    if (!_.has(daysTotals, index)) daysTotals[index] = 0;
                                    if (!_.has(daysTotalsObjective, index)) daysTotalsObjective[index] = 0;
                                    return (
                                        <th key={index}>{moment(el).format(this.dateFormat)}</th>
                                    )
                                })
                            }
                            <th>{i18next.t('total')}</th>
                        </tr>
                        {
                            this.props.groups.map((group) => {
                                let groupLogins = this.props.clients.filter((client) => {
                                    return group.ids.indexOf(client.id) !== -1;
                                }).map((client) => {
                                    return client.login;
                                });
                                groupLogins = _.sortBy(groupLogins, [function (o) {
                                    return o.toLowerCase();
                                }]);
                                return (
                                    [
                                        <tr>
                                            <th className="head-column">{group.name}</th>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>,
                                        groupLogins.map((login, index) => {
                                            let loginData = this.props.callsTotals.data[login];
                                            loginData = loginData ? loginData : [];
                                            let clientTotal = 0;
                                            let clientTotalObjective = 0;
                                            const clientData = _.find(this.props.clients, (c) => {
                                                return c.login === login;
                                            });
                                            return (
                                                <tr key={index}>
                                                    <td className="head-column">{clientData.alias ? clientData.alias : login}</td>
                                                    {
                                                        loginData.map((el, i) => {
                                                            const count = el.count;
                                                            const objectiveCount = el.objectiveCount;
                                                            daysTotals[i] += count;
                                                            daysTotalsObjective[i] += objectiveCount;
                                                            clientTotal += count;
                                                            clientTotalObjective += objectiveCount;
                                                            const className = count !== 0 ? 'info-cell' : '';
                                                            const duration = this.state.duration;
                                                            return <td className={'center ' + className}
                                                                       key={i}
                                                                       onClick={count > 0 ? () =>
                                                                           this.infoCellClickHandler({
                                                                               logins: [login],
                                                                               from: this.props.callsTotals.dates[i],
                                                                               to: this.props.callsTotals.dates[i],
                                                                               duration
                                                                           }) : function () {
                                                                       }}>{count} <span
                                                                className="note">({objectiveCount})</span>
                                                            </td>
                                                        })
                                                    }
                                                    {
                                                        <th className={'center ' + (clientTotal > 0 ? 'info-cell' : '')}
                                                            onClick={clientTotal > 0 ? () =>
                                                                this.infoCellClickHandler({
                                                                    logins: [login],
                                                                    from: this.props.callsTotals.dates[0],
                                                                    to: this.props.callsTotals.dates[this.props.callsTotals.dates.length - 1],
                                                                    duration: this.state.duration
                                                                }) : function () {
                                                            }}>{clientTotal} <span
                                                            className="note">({clientTotalObjective})</span>
                                                        </th>
                                                    }
                                                </tr>
                                            )
                                        })
                                    ]
                                );
                            })
                        }
                        <tr>
                            <th className="head-column">{i18next.t('total')}</th>
                            {
                                daysTotals.map((el, i) => {
                                    return (
                                        <th key={i}
                                            className={'center ' + (el > 0 ? 'info-cell' : '')}
                                            onClick={el > 0 ? () =>
                                                this.infoCellClickHandler({
                                                    logins: this.props.clients.filter(c => c.checked).map(c => c.login),
                                                    from: this.props.callsTotals.dates[i],
                                                    to: this.props.callsTotals.dates[i],
                                                    duration: this.state.duration
                                                }) : function () {
                                            }}>{el} <span className="note">({daysTotalsObjective[i]})</span></th>
                                    )
                                })
                            }
                            <th className={'center ' + (_.reduce(daysTotals, function (sum, n) {
                                return sum + n;
                            }, 0) > 0 ? 'info-cell' : '')}
                                onClick={_.reduce(daysTotals, function (sum, n) {
                                    return sum + n;
                                }, 0) > 0 ? () =>
                                    this.infoCellClickHandler({
                                        logins: this.props.clients.filter(c => c.checked).map(c => c.login),
                                        from: this.props.callsTotals.dates[0],
                                        to: this.props.callsTotals.dates[this.props.callsTotals.dates.length - 1],
                                        duration: this.state.duration
                                    }) : function () {
                                }}>{_.reduce(daysTotals, function (sum, n) {
                                return sum + n;
                            }, 0)} <span className="note">({_.reduce(daysTotalsObjective, function (sum, n) {
                                return sum + n;
                            }, 0)})</span></th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    const {user: {permissions}} = state.account;
    const {updateDate, clients, groups, loginIds, callsTotals, callsDetails} = state.telephony;

    return {
        userPermissions: permissions,
        updateDate,
        clients,
        groups,
        loginIds,
        callsTotals,
        callsDetails
    };
}

export default connect(mapStateToProps)(Telephony);