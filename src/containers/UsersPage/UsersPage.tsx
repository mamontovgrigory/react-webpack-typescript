import * as React from 'react';
import {connect} from 'react-redux';

import {getUsers} from '../../redux/actions/usersActions';
import {getGroups} from '../../redux/actions/groupsActions';
import {dialog, generator, grid} from '../../shell';

import UserItem from './UserItem';
import Button from '../../components/Button';

interface Props {
    dispatch?:any;
    users?:any[];
    groups?:any[];
}

interface State {
    gridId?:string;
}

class UsersPage extends React.Component<Props, State> {
    constructor() {
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
                    name: 'groupId',
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
            i18next.t('creatingNewUser'),
            <UserItem saveButtonId={saveButtonId}
                      groups={this.props.groups}
                      dispatch={this.props.dispatch}/>,
            buttons);
    }

    editClickHandler() {
        let userIds = grid.getSelectedRows({
            gridId: this.state.gridId
        });

        if (userIds.length === 1) {
            let userData = grid.getData({
                gridId: this.state.gridId,
                rowId: _.first(userIds)
            });
            console.log('gridData', userData);
            let saveButtonId = generator.genId();
            let editText = i18next.t('edit');
            let buttons = [
                {
                    title: editText,
                    id: saveButtonId,
                    text: editText
                }
            ];
            this.openUserItemModal(
                i18next.t('creatingNewUser'),
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
                body: i18next.t('pleaseChooseOneUserForEdit')
            });
        }
    }

    openUserItemModal(header, body, buttons:{title:string,id:string,text:string}[]) {
        dialog.modal({
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
                    <Button title={i18next.t('add')} onClick={this.addClickHandler.bind(this)}>
                        <i className="material-icons">playlist_add</i>
                    </Button>
                    <Button title={i18next.t('edit')}
                            onClick={this.editClickHandler.bind(this)}>
                        <i className="material-icons">mode_edit</i>
                    </Button>
                    <Button title={i18next.t('delete')}>
                        <i className="material-icons">delete</i>
                    </Button>
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