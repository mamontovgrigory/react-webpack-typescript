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
        initUsersGrid('test', this.props.users);
    }

    componentWillMount() {
        this.props.dispatch(usersRequest());
    }

    render() {
        return (
            <div>
                <h4>{i18next.t('users')}</h4>
                <div>
                    <table id="test"></table>
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