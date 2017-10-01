import * as React from 'react';
import {connect} from 'react-redux';

import {dialog, generator, grid} from 'shell/index';
import {ICabinet} from 'models/cabinets';
import {getCabinets, getCabinetsClients, deleteCabinets} from 'redux/actions/cabinetsActions';
import Button from 'components/Button/Button';
import CabinetItem from './CabinetItem';

interface IProps {
    dispatch: any;

    cabinets: ICabinet[];
}

interface IState {

}

class CabinetsPage extends React.Component<IProps, IState> {
    gridId: string = generator.genId();

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getCabinets());
    }

    componentDidUpdate() {
        const {cabinets} = this.props;
        grid.init({
            gridId: this.gridId,
            data: cabinets,
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
                    name: 'name',
                    label: i18next.t('cabinetName')
                }
            ]
        });
    }

    openCabinetItemModal(header, body, buttons: { title: string, id: string, text: string }[]) {
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

    addClickHandler() {
        const {dispatch} = this.props;
        let saveButtonId = generator.genId();
        let buttonText = i18next.t('save');
        let buttons = [
            {
                title: buttonText,
                id: saveButtonId,
                text: buttonText
            }
        ];
        this.openCabinetItemModal(
            i18next.t('creatingCabinet'),
            <CabinetItem saveButtonId={saveButtonId}
                         dispatch={dispatch}/>,
            buttons);
    }

    editClickHandler() {
        const {dispatch, cabinets} = this.props;

        let rowsIds = grid.getSelectedRows(this.gridId);
        if (rowsIds.length === 1) {
            const rowId = Number(_.first(rowsIds));
            const rowData = _.find(cabinets, function (u) {
                return u.id === rowId;
            });
            const saveButtonId = generator.genId();
            const editText = i18next.t('save');
            const buttons = [
                {
                    title: editText,
                    id: saveButtonId,
                    text: editText
                }
            ];
            const openCabinetItemModal = this.openCabinetItemModal.bind(this);
            dispatch(getCabinetsClients({
                id: rowData.id
            }, function (clients) {
                openCabinetItemModal(
                    i18next.t('editingCabinet'),
                    <CabinetItem id={rowData.id}
                                 login={rowData.login}
                                 password={rowData.password}
                                 clients={clients}
                                 name={rowData.name}
                                 saveButtonId={saveButtonId}
                                 dispatch={dispatch}/>,
                    buttons);
            }));
        } else {
            dialog.modal({
                header: i18next.t('chooseOneRow'),
                body: i18next.t('pleaseChooseOneRowToEdit')
            });
        }
    }

    deleteClickHandler() {
        const {dispatch} = this.props;

        let rowsIds = grid.getSelectedRows(this.gridId);
        if (rowsIds && rowsIds.length > 0) {
            dialog.confirm({
                header: i18next.t('confirmAction'),
                text: i18next.t('deleteChosenData') + '?',
                confirmCallback: function () {
                    dispatch(deleteCabinets({
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

    render() {
        return (
            <div>
                <h4>{i18next.t('telephonyCabinets')}</h4>
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

function mapStateToProps(state: any) {
    const {cabinets} = state.cabinets;

    return {cabinets};
}

export default connect(mapStateToProps)(CabinetsPage);