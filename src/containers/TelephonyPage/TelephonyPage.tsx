import * as React from 'react';
import * as moment from 'moment';
import {connect} from 'react-redux';

import {generator, dialog} from 'shell/index';
import {getUpdateDate, getClients, setCheckedClients, getCallsTotals} from 'redux/actions/telephonyActions';

const style = require('./telephonyPage.scss'); //TODO: use classes as variables

interface Props {
    updateDate?:string;
    clients?:any[];
    checkedClientsIds?:any[];
    callsTotals:any;

    dispatch?:any;
}

interface State {
    from?:string;
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
    dateFormat = 'DD.MM.YYYY';

    componentWillMount() {
        this.props.dispatch(getUpdateDate());
        if (this.props.clients.length === 0) this.props.dispatch(getClients());
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
        if (Materialize.updateTextFields && typeof(Materialize.updateTextFields) === 'function')
            Materialize.updateTextFields();
    }

    componentDidUpdate() {

    }

    durationChangeHandler(e) {
        this.setState({
            duration: e.target.value
        });
    }

    selectAllClickHandler(e) {
        let checkedClientsIds = e.target.checked ? this.props.clients.map((client) => {
            return client.id;
        }) : [];
        this.props.dispatch(setCheckedClients(checkedClientsIds));
    }

    clientCheckboxChangeHandler(e) {
        let id = e.target.value;
        let checkedClientsIds = this.props.checkedClientsIds;
        if (e.target.checked) {
            checkedClientsIds.push(id);
        } else {
            checkedClientsIds = _.without(checkedClientsIds, id);
        }
        this.props.dispatch(setCheckedClients(checkedClientsIds)); //TODO: Fix selection bug
    }

    getFilters(){
        return {
            from: this.state.from,
            to: this.state.to,
            loginIds: this.props.checkedClientsIds,
            duration: this.state.duration
        };
    }

    searchClickHandler() {
        $('#' + this.divClientsListId).slideUp();
        this.props.dispatch(getCallsTotals(this.getFilters()));
    }

    reportClickHandler() {
        let serverUrl = (NODE_ENV.trim() === 'development' ?
                'http://ramazanavtsinov.myjino.ru' :
                window.location.origin); //TODO: Move to config
        
        window.location.href = serverUrl + '/ajax/get_report.php?' + $.param(this.getFilters());
    }

    slideClickHandler() {
        $('#' + this.divClientsListId).slideToggle();
    }


    infoCellClickHandler(login, date, duration) {
        console.log(login, date, duration);
    }

    render() {
        let daysTotals = [];
        return (
            <div className={'telephony'}>
                <div className="row">
                    <div className="input-field col s3">
                        <input type="date" id={this.inputFromId} className="datepicker"
                               defaultValue={this.state.from}/>
                        <label htmlFor="date-from" className="active">{i18next.t('periodFrom')}</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="date" id={this.inputToId} className="datepicker"
                               defaultValue={this.state.to}/>
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
                        <div className="divider"></div>
                        <h4>{i18next.t('clients')}</h4>
                    </div>
                    <div className="row">
                        <div className="input-field col s3">
                            <input type="checkbox" id={"select-all"}
                                   checked={this.props.checkedClientsIds &&
                                   this.props.clients.length === this.props.checkedClientsIds.length}
                                   onClick={this.selectAllClickHandler.bind(this)}/>
                            <label htmlFor={"select-all"}>{i18next.t('selectAll')}</label>
                        </div>
                    </div>
                    {/*<div className="row">
                     <div className="input-field col s3">
                     <input type="checkbox" id={"select-official"}
                     checked={this.state.official && !this.state.unofficial}
                     onClick={this.selectGroupOfficialClickHandler.bind(this)}/>
                     <label htmlFor={"select-official"}>Официальные</label>
                     </div>
                     <div className="input-field col s3">
                     <input type="checkbox" id={"select-unofficial"}
                     checked={this.state.unofficial && !this.state.official}
                     onClick={this.selectGroupUnofficialClickHandler.bind(this)}/>
                     <label htmlFor={"select-unofficial"}>Неофициальные</label>
                     </div>
                     </div>*/}
                    <div className="row">
                        {
                            this.props.clients && this.props.clients.map((client) => {
                                //let checkboxId = generator.genId();
                                return (
                                    <div className="input-field col s3" key={client.id}>
                                        <input type="checkbox" id={"login" + client.id}
                                               value={client.id}
                                               checked={_.indexOf(this.props.checkedClientsIds, client.id) !== -1}
                                               onChange={this.clientCheckboxChangeHandler.bind(this)}/>
                                        <label htmlFor={"login" + client.id}>{client.login}</label>
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
                    <table className={this.props.callsTotals.dates.length === 0 ? "hide" : "bordered"}>
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
    const {updateDate, clients, checkedClientsIds, callsTotals} = state.telephony;

    return {updateDate, clients, checkedClientsIds, callsTotals};
}

export default connect(mapStateToProps)(Telephony);