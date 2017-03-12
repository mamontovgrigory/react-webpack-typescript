import * as React from 'react';
import {connect} from 'react-redux';

import {getUsers, deleteUsers} from 'redux/actions/usersActions';
import {getGroups} from 'redux/actions/groupsActions';
import {dialog, generator, grid} from 'shell/index';

import Button from 'components/Button/Button';
import UserItem from './UserItem';

interface Props {
    dispatch?:any;
    users?:any[];
    groups?:any[];
}

interface State {

}

class UsersPage extends React.Component<Props, State> {
    gridId:string = generator.genId();

    componentDidUpdate() {
        grid.init({
            gridId: this.gridId,
            data: _.map(this.props.users, function (r) {
                return {
                    id: r.id,
                    login: r.login,
                    groupId: r.groupId,
                    groupName: r.groupName
                };
            }),
            colModel: [
                {
                    name: 'id',
                    hidden: true
                },
                {
                    name: 'groupId',
                    hidden: true
                },
                {
                    name: 'login',
                    label: i18next.t('login')
                },
                {
                    name: 'groupName',
                    label: i18next.t('group')
                }
            ]
        });
    }

    componentWillMount() {
        this.props.dispatch(getUsers());
        this.props.dispatch(getGroups());
    }

    addClickHandler() {
        let saveButtonId = generator.genId();
        let buttonText = i18next.t('save');
        let buttons = [
            {
                title: buttonText,
                id: saveButtonId,
                text: buttonText
            }
        ];
        this.openUserItemModal(
            i18next.t('creatingUser'),
            <UserItem saveButtonId={saveButtonId}
                      groups={this.props.groups}
                      dispatch={this.props.dispatch}/>,
            buttons);
    }

    editClickHandler() {
        let rowsIds = grid.getSelectedRows(this.gridId);

        if (rowsIds.length === 1) {
            let userId = _.first(rowsIds);
            let userData =  _.find(this.props.users, function(u){
                return u.id === userId;
            });
            let saveButtonId = generator.genId();
            let editText = i18next.t('save');
            let buttons = [
                {
                    title: editText,
                    id: saveButtonId,
                    text: editText
                }
            ];
            this.openUserItemModal(
                i18next.t('editingUser'),
                <UserItem id={userData.id}
                          login={userData.login}
                          groupId={userData.groupId}
                          saveButtonId={saveButtonId}
                          groups={this.props.groups}
                          dispatch={this.props.dispatch}/>,
                buttons);
        } else {
            dialog.modal({
                header: i18next.t('chooseOneRow'),
                body: i18next.t('pleaseChooseOneRowToEdit')
            });
        }
    }

    deleteClickHandler() {
        let rowsIds = grid.getSelectedRows(this.gridId);
        if (rowsIds && rowsIds.length > 0) {
            let dispatch = this.props.dispatch;
            dialog.confirm({
                header: i18next.t('confirmAction'),
                text: i18next.t('deleteChosenData') + '?',
                confirmCallback: function () {
                    dispatch(deleteUsers({
                        ids: rowsIds
                    }));
                }
            });
        } else {
            dialog.modal({
                header: i18next.t('noOneRowChosen'),
                body: i18next.t('pleaseChooseRowsToDelete')
            });
        }
    }

    openUserItemModal(header, body, buttons:{title:string,id:string,text:string}[]) {
        return dialog.modal({
            header: header,
            body: body,
            buttons: buttons.map((el, i) => {
                return <Button
                    title={el.title}
                    key={i}
                    id={el.id}>
                    {el.text}
                </Button>
            })
        });
    }

    render() {
        return (
            <div>
                <h4>{i18next.t('users')}</h4>
                <div className="row">
                    <Button title={i18next.t('add')}
                            onClick={this.addClickHandler.bind(this)}>
                        <i className="material-icons">playlist_add</i>
                    </Button>
                    <Button title={i18next.t('edit')}
                            onClick={this.editClickHandler.bind(this)}>
                        <i className="material-icons">mode_edit</i>
                    </Button>
                    <Button title={i18next.t('delete')}
                            onClick={this.deleteClickHandler.bind(this)}>
                        <i className="material-icons">delete</i>
                    </Button>
                </div>
                <div className="row">
                    <table id={this.gridId}/>
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