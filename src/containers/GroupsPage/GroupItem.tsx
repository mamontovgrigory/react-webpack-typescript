import * as React from 'react';

import {saveGroup} from 'redux/actions/groupsActions';
import {generator, dialog} from 'shell/index';

interface Props {
    dispatch?: any;

    id?: number;
    name?: string;
    permissions?: any[];
    values?: any[];
    saveButtonId?: string;
}

interface State {
    name?: string;
    settings?: any;
}

export default class GroupItem extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        var settings = {};
        _.forEach(props.values, function (val) {
            var permission = _.find(props.permissions, function (p) {
                return parseInt(p.id) === parseInt(val.permissionId);
            });
            var value = permission.list ? [] : false;
            if (permission.list) {
                let list = permission.list.map((el) => {
                    return parseInt(el.id);
                });
                value = val.value === 'all' ? list : val.value.split(',').map((v) => {
                    return parseInt(v);
                }).filter((v) => {
                    return list.indexOf(v) !== -1;
                });
            } else {
                value = val.value === 'true';
            }
            settings[parseInt(permission.id)] = value;
        });

        this.state = {
            name: props.name,
            settings: settings
        };
    }

    nameInput: HTMLInputElement;

    componentDidMount() {
        Materialize.updateTextFields();

        let self = this;

        $('#' + this.props.saveButtonId).on('click', function () { //TODO: Needs react realization
            let dialogId = $(this).closest('.modal').attr('id');
            self.save(function () {
                dialog.close(dialogId);
            });
        });
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }

    permissionCheckboxChangeHandler(e) {
        var settings = this.state.settings;
        settings[e.target.name] = e.target.checked;
        this.setState({
            settings: settings
        });
    }

    selectAllClickHandler(list, permissionId, e) {
        var settings = this.state.settings;
        settings[parseInt(permissionId)] = e.target.checked ? _.map(list, function (r) {
            return parseInt(r.id);
        }) : [];
        this.setState({
            settings: settings
        });
    }

    listItemCheckboxChangeHandler(permissionId, listItemId, e) {
        var settings = this.state.settings;
        listItemId = parseInt(listItemId);
        var itemsList = settings[permissionId] ? settings[permissionId] : [];
        if (e.target.checked) {
            itemsList.push(listItemId);
        } else {
            itemsList = _.without(itemsList, listItemId);
        }
        settings[permissionId] = itemsList;
        this.setState({
            settings: settings
        });
    }

    save(callback) {
        const {id, permissions, dispatch} = this.props;
        const {name, settings} = this.state;
        if (!name) {
            this.nameInput.focus();
            return;
        }

        let settingsObject = [];
        Object.keys(settings).map((key) => {
            const permission = _.find(permissions, function (p) {
                return parseInt(p.id) === parseInt(key);
            });
            let value = settings[key];
            if (permission.list) {
                if (value.length == permission.list.length) {
                    value = 'all';
                } else {
                    value = value.join(',');
                }
            }
            settingsObject.push({
                value,
                permissionId: key
            });
        });

        dispatch(saveGroup({
            id: id,
            name: name,
            settings: settingsObject
        }));
        callback();
    }

    render() {
        const {name, permissions} = this.props;
        let inputNameId = generator.genId();
        return (
            <div>
                <div className="row m-b-0">
                    <div className="input-field col s6">
                        <input id={inputNameId} type="text"
                               defaultValue={name}
                               ref={(input) => {
                                   this.nameInput = input;
                               }}
                               onChange={this.nameChangeHandler.bind(this)}/>
                        <label htmlFor={inputNameId}>{i18next.t('groupName')}</label>
                    </div>
                </div>
                <div className="row m-b-0">
                    <div className="input-field col s12">
                        <h5>{i18next.t('permissions')}</h5>
                    </div>
                </div>
                {
                    permissions.map((el) => {
                        var checkboxId = generator.genId();
                        var value = this.state.settings[parseInt(el.id)];
                        return (
                            el.list ?
                                <div key={el.id}>
                                    <div className="row m-b-0 m-t-10">
                                        <div className="input-field col s12">
                                            <h5 className="m-b-0">{el.name}</h5>
                                        </div>
                                    </div>
                                    {
                                        <div className="row">
                                            <div className="input-field col s3">
                                                <input type="checkbox" id={checkboxId}
                                                       checked={value && el.list.length === value.length}
                                                       onChange={this.selectAllClickHandler.bind(this, el.list, el.id)}/>
                                                <label htmlFor={checkboxId}>{i18next.t('all')}</label>
                                            </div>
                                        </div>
                                    }
                                    <div className="row">
                                        {
                                            el.list.map((li) => {
                                                let listCheckboxId = generator.genId();
                                                let checked = _.indexOf(value, parseInt(li.id)) !== -1;
                                                return (
                                                    <div className="input-field col s3" key={li.id}>
                                                        <input type="checkbox" id={listCheckboxId}
                                                               value={li.id}
                                                               checked={checked}
                                                               onChange={this.listItemCheckboxChangeHandler.bind(this, el.id, li.id)}/>
                                                        <label htmlFor={listCheckboxId}>{li.name}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div className="row m-b-0" key={el.id}>
                                    <div className="input-field col s12">
                                        <input type="checkbox" id={"permission" + checkboxId} name={el.id}
                                               value={el.id}
                                               defaultChecked={value}
                                               onChange={this.permissionCheckboxChangeHandler.bind(this)}/>
                                        <label htmlFor={"permission" + checkboxId}>{el.name}</label>
                                    </div>
                                </div>
                        )
                    })
                }
            </div>
        )
    }
}