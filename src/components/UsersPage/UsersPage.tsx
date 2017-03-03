import * as React from 'react';
import {connect} from "react-redux";

import {usersRequest} from '../../redux/actions/usersActions';
import {generator, grid} from '../../shell';

import UserItem from './UserItem';

import Modal from '../Modal';

interface Props {
    dispatch?:any;
    users?:any[];
}

interface State {
    gridId?:string;
}

class UsersPage extends React.Component<Props, State> {
    constructor(){
        super();

        this.state = {
            gridId: generator.genId()
        }
    }
    componentDidUpdate() {
        grid.init({
            gridId: this.state.gridId,
            data: _.map(this.props.users, function (r) {
                return {
                    id: r.id,
                    login: r.login,
                    group: r.groupId
                };
            }),
            colModel: [
                {
                    name: 'id',
                    hidden: true
                },
                {
                    name: 'login',
                    label: i18next.t('login')
                },
                {
                    name: 'group',
                    label: i18next.t('group')
                }
            ]
        });
    }

    componentWillMount() {
        this.props.dispatch(usersRequest());
    }

    render() {
        return (
            <div>
                <h4>{i18next.t('users')}</h4>
                <div className="row">
                    <Modal
                        header={i18next.t('creatingNewUser')}
                        trigger={
                            <button className="btn waves-effect waves-light" title={i18next.t('add')}>
                                <i className="material-icons">playlist_add</i>
                            </button>
                        }
                        buttons={[
                            {
                                text: i18next.t('save')
                            }
                        ]}>
                        <UserItem/>
                    </Modal>
                    <Modal
                        header={i18next.t('editingUser')}
                        trigger={
                            <button className="waves-effect waves-light btn m-l-10" title={i18next.t('edit')}>
                                <i className="material-icons">mode_edit</i>
                            </button>
                        }>
                        <div>edit</div>
                    </Modal>
                    <button className="waves-effect waves-light btn m-l-10" title={i18next.t('delete')}>
                        <i className="material-icons">delete</i>
                    </button>
                </div>
                <div className="row">
                    <table id={this.state.gridId}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {users} = state.users;

    return {users};
}

export default connect(mapStateToProps)(UsersPage);