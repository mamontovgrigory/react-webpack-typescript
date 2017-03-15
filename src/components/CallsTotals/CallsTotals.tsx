import * as React from 'react';
import {connect} from 'react-redux';

import {getCallsDetails} from 'redux/actions/telephonyActions';

interface Props {
    clients?:any[];
    callsTotals:any;

    dispatch?:any;
}

interface State {
    from?:string;
    to?:string;
    duration?:number;
}

export default class CallsTotals extends React.Component<Props, State> {
    dateFormat = 'DD.MM.YYYY';

    infoCellClickHandler(login, date, duration) {
        var clientObj = _.find(this.props.clients, function (c) {
            return c.login === login;
        });

        /*this.props.dispatch(getCallsDetails({
            loginId: clientObj.id,
            date: date,
            duration: duration
        }));*/
    }


    render() {
        let daysTotals = [];
        return (
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
        )
    }
}

function mapStateToProps(state:any) {
    const {clients, callsTotals} = state.telephony;

    return {clients,  callsTotals};
}

export default connect(mapStateToProps)(CallsTotals);