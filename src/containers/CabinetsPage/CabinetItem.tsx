import * as React from 'react';

import { dialog } from 'shell/index';
import { saveCabinet } from 'redux/actions/cabinetsActions';
import Input from 'components/Input/Input';

interface IProps {
    dispatch: any;

    id?: string;
    login?: string;
    password?: string;
    name?: string;
    saveButtonId: string;
    clients?: any[];
}

interface IState {
    id?: string;
    login?: string;
    password?: string;
    name?: string;
    clientsSettings?: {
        id: string;
        active: boolean;
        deleted: boolean;
        alias?: string;
        price?: string;
    }[];
}

export default class CabinetItem extends React.Component<IProps, IState> {
    loginInput: HTMLInputElement;
    passwordInput: HTMLInputElement;

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            login: props.login,
            password: props.password,
            name: props.name,
            clientsSettings: props.clients ? props.clients.map((client) => {
                return {
                    id: client.id,
                    active: parseInt(client.active) === 1,
                    deleted: false,
                    alias: client.alias,
                    price: client.price
                };
            }) : []
        }
    }

    componentDidMount() {
        const {saveButtonId} = this.props;

        const save = this.save.bind(this);
        $('#' + saveButtonId).on('click', function () { //TODO: Needs react realization
            const dialogId = $(this).closest('.modal').attr('id');
            save(function () {
                dialog.close(dialogId);
            });
        });
    }

    loginChangeHandler(e) {
        this.setState({
            login: e.target.value
        })
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        })
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        })
    }

    setClientActive(clientId, e) {
        const {clientsSettings} = this.state;
        this.setState({
            clientsSettings: clientsSettings.map((c) => {
                if (c.id === clientId) {
                    c.active = e.target.checked;
                }
                return c;
            })
        })
    }

    setClientAlias(clientId, e) {
        const {clientsSettings} = this.state;
        this.setState({
            clientsSettings: clientsSettings.map((c) => {
                if (c.id === clientId) {
                    c.alias = e.target.value;
                }
                return c;
            })
        })
    }

    setClientPrice(clientId, e) {
        const {clientsSettings} = this.state;
        this.setState({
            clientsSettings: clientsSettings.map((c) => {
                if (c.id === clientId) {
                    c.price = e.target.value;
                }
                return c;
            })
        })
    }

    setClientDeleted(clientId, e) {
        const {clientsSettings} = this.state;
        this.setState({
            clientsSettings: clientsSettings.map((c) => {
                if (c.id === clientId) {
                    c.deleted = true;
                }
                return c;
            })
        })
    }

    save(callback) {
        const {dispatch} = this.props;
        const {id, login, password, name, clientsSettings} = this.state;

        if (!login) {
            this.loginInput.focus();
            return;
        }
        if (!password) {
            this.passwordInput.focus();
            return;
        }
        dispatch(saveCabinet({
            id,
            login,
            password,
            name,
            clientsSettings
        }));
        callback();
    }

    render() {
        const {clients} = this.props;
        const {login, password, name, clientsSettings} = this.state;
        return (
            <div>
                <div className="row">
                    <Input s={6}
                           value={login}
                           getRef={(input) => {
                               this.loginInput = input;
                           }}
                           onChange={this.loginChangeHandler.bind(this)}
                           label={i18next.t('login')}/>
                    <Input s={6}
                           value={password}
                           getRef={(input) => {
                               this.passwordInput = input;
                           }}
                           onChange={this.passwordChangeHandler.bind(this)}
                           label={i18next.t('password')}/>
                </div>
                <div className="row">
                    <Input value={name}
                           onChange={this.nameChangeHandler.bind(this)}
                           label={i18next.t('cabinetName')}/>
                </div>
                {clientsSettings && <div className="row">
                    <h5>{i18next.t('clients')}</h5>
                    <table className="bordered">
                        <tbody>
                        <tr>
                            <th className="head-column"/>
                            <th className="head-column">{i18next.t('client')}</th>
                            <th className="head-column"/>
                            <th className="head-column"/>
                        </tr>
                        {clients && clients.map((client, index) => {
                            const clientSettings = _.find(clientsSettings, (c) => {
                                return c.id === client.id;
                            });
                            return (
                                clientSettings.deleted ?
                                    null :
                                    <tr key={index}>
                                        <td>
                                            <div className="switch">
                                                <label>
                                                    {i18next.t('hide')}
                                                    <input type="checkbox" checked={clientSettings.active}
                                                           onChange={this.setClientActive.bind(this, client.id)}/>
                                                    <span className="lever"/>
                                                    {i18next.t('show')}
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            {client.login}
                                        </td>
                                        <td>
                                            <Input label={i18next.t('alias')}
                                                   value={clientSettings.alias}
                                                   onChange={this.setClientAlias.bind(this, client.id)}/>
                                        </td>
                                        <td>
                                            <Input label={i18next.t('price')}
                                                   value={clientSettings.price}
                                                   onChange={this.setClientPrice.bind(this, client.id)}/>
                                        </td>
                                        <td>
                                            <button className="waves-effect waves-green btn-flat right"
                                                    onClick={this.setClientDeleted.bind(this, client.id)}>
                                                {i18next.t('delete')}
                                            </button>
                                        </td>
                                    </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>}
            </div>
        )
    }
}