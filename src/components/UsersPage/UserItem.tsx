import * as React from 'react';

import {generator} from '../../shell';

interface Props {
    id?:number;
    login?:any;
    groupId?:any;
}

interface State {
    loginFieldId?:string;
    passwordFieldId?:string;
    groupIdFieldId?:string;

    groupsList?:any[];
    login?:string;
    groupId?:number;
    password?:number;
}

class UserItem extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            groupsList: [],
            loginFieldId: generator.genId(),
            passwordFieldId: generator.genId(),
            groupIdFieldId: generator.genId()
        }
    }

    componentDidMount() {
        Materialize.updateTextFields();
        let $groupId = $('#' + this.state.groupIdFieldId);
        $groupId.material_select();
        $groupId.on('change', this.groupChangeHandler.bind(this));
    }

    loginChangeHandler(e) {
        this.setState({
            login: e.target.value
        });
    }

    groupChangeHandler(e) {
        this.setState({
            groupId: e.target.value
        });
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={this.state.loginFieldId} type="text"
                               defaultValue={this.props.login}
                               onChange={this.loginChangeHandler.bind(this)}/>
                        <label htmlFor={this.state.loginFieldId}>{i18next.t('login')}</label>
                    </div>
                    <div className="input-field col s6">
                        <select id={this.state.groupIdFieldId} value={this.props.groupId}>
                            <option value="">{i18next.t('withoutGroup')}</option>
                            {
                                this.state.groupsList.map((el) => {
                                    return (
                                        <option value={el.id} key={el.id}>{el.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label>{i18next.t('group')}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={this.state.passwordFieldId} type="password"
                               onChange={this.passwordChangeHandler.bind(this)}/>
                        <label
                            htmlFor={this.state.passwordFieldId}>{this.props.id ?
                            i18next.t('newPassword') :
                            i18next.t('password')}</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserItem;