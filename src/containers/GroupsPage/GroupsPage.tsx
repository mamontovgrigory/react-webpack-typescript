import * as React from 'react';
import {connect} from 'react-redux';

import {getGroups, deleteGroups} from 'redux/actions/groupsActions';
import {getPermissions} from 'redux/actions/permissionsActions';
import {dialog, generator, grid} from 'shell/index';

import Button from 'components/Button/Button';
import GroupItem from './GroupItem';

interface Props {
    dispatch?:any;
    groups?:any[];
    permissions?:any[];
}

interface State {
    gridId?:string;
}

class GroupsPage extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            gridId: generator.genId()
        }
    }

    componentDidUpdate() {
        grid.init({
            gridId: this.state.gridId,
            data: [
                {
                    id: 1,
                    name: 'Администраторы'
                },
                {
                    id: 2,
                    name: 'Менеджеры'
                }
            ],
            colModel: [
                {
                    name: 'id',
                    hidden: true
                },
                {
                    name: 'name',
                    label: i18next.t('group')
                }
            ]
        });
    }

    componentWillMount() {
        this.props.dispatch(getGroups());
        this.props.dispatch(getPermissions());
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
        this.openGroupItemModal(
            i18next.t('creatingGroup'),
            <GroupItem permissions={this.props.permissions}
                       saveButtonId={saveButtonId}
                       dispatch={this.props.dispatch}/>,
            buttons);
    }

    editClickHandler() {
        let rowsIds = grid.getSelectedRows(this.state.gridId);

        if (rowsIds.length === 1) {
            let groupId = Number(_.first(rowsIds));
            let groupData = _.find(this.props.groups, function (g) {
                return g.id === groupId;
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
            this.openGroupItemModal(
                i18next.t('editingGroup'),
                <GroupItem id={groupData.id}
                           name={groupData.name}
                           permissions={this.props.permissions}
                           values={groupData.values}
                           saveButtonId={saveButtonId}
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
        let rowsIds = grid.getSelectedRows(this.state.gridId);
        if (rowsIds && rowsIds.length > 0) {
            let dispatch = this.props.dispatch;
            dialog.confirm({
                header: i18next.t('confirmAction'),
                text: i18next.t('deleteChosenData') + '?',
                confirmCallback: function () {
                    dispatch(deleteGroups({
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

    openGroupItemModal(header, body, buttons:{title:string,id:string,text:string}[]) {
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
                <h4>{i18next.t('groups')}</h4>
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
                    <table id={this.state.gridId}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {groups} = state.groups;
    const {permissions} = state.permissions;

    return {groups, permissions};
}

export default connect(mapStateToProps)(GroupsPage);