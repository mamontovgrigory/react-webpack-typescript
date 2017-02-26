import * as React from 'react';
import {connect} from "react-redux";

import {usersRequest, initUsersGrid} from '../../redux/actions/usersActions';

interface Props {
    dispatch?:any;
    users?:any[];
}

interface State {

}

class UsersPage extends React.Component<Props, State> {
    componentDidUpdate() {
        initUsersGrid('test', this.props.users); //TODO: Generate unique id
    }

    componentWillMount() {
        this.props.dispatch(usersRequest());
    }

    render() {
        return (
            <div>
                <h4>{i18next.t('users')}</h4>
                <div className="row">
                    <button className="btn waves-effect waves-light" title={i18next.t('add')}>
                        <i className="material-icons">playlist_add</i>
                    </button>
                    <button className="waves-effect waves-light btn m-l-10" title={i18next.t('edit')}>
                        <i className="material-icons">mode_edit</i>
                    </button>
                    <button className="waves-effect waves-light btn m-l-10" title={i18next.t('delete')}>
                        <i className="material-icons">delete</i>
                    </button>
                </div>
                <div className="row">
                    <table id="test"/>
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