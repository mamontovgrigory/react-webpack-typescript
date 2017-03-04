import * as React from 'react';
import {connect} from "react-redux";

import {usersRequest} from '../../redux/actions/usersActions';
import {groupsRequest} from '../../redux/actions/groupsActions';
import {dialog, generator, grid} from '../../shell';

import UserItem from './UserItem';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

interface Props {
    dispatch?:any;
    users?:any[];
    groups?:any[];
}

interface State {
    gridId?:string;
    saveButtonId?:string;
    editButtonId?:string;
}

class UsersPage extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            gridId: generator.genId(),
            saveButtonId: generator.genId(), //TODO: Remove. Catch onclick event inside UserItem component
            editButtonId: generator.genId() //TODO: Remove. Catch onclick event inside UserItem component
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
        this.props.dispatch(groupsRequest());
    }

    editClickHandler(){
        dialog.modal();
    }

    render() {
        let saveText = i18next.t('save');
        let editText = i18next.t('edit');
        let addFormButtons = [
            {
                title: saveText,
                id: this.state.saveButtonId,
                text: saveText
            }
        ];
        let editFormButtons = [
            {
                title: editText,
                id: this.state.editButtonId,
                text: editText
            }
        ];
        return (
            <div>
                <h4>{i18next.t('users')}</h4>
                <div className="row">
                    <Modal
                        header={i18next.t('creatingNewUser')}
                        trigger={
                            <Button title={i18next.t('add')}>
                                <i className="material-icons">playlist_add</i>
                            </Button>
                        }
                        buttons={addFormButtons.map((el, i) => {
                            return <Button
                                title={el.title}
                                key={i}
                                id={el.id}>
                                {el.text}
                            </Button>
                        })}>
                        <UserItem saveButtonId={this.state.saveButtonId} groups={this.props.groups}/>
                    </Modal>
                    <button className="waves-effect waves-light btn m-l-10"
                            title={i18next.t('edit')}
                            onClick={this.editClickHandler.bind(this)}>
                        <i className="material-icons">mode_edit</i>
                    </button>
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
    const {groups} = state.groups;

    return {users, groups};
}

export default connect(mapStateToProps)(UsersPage);