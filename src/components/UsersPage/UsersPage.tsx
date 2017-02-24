import * as React from 'react';
import {connect} from "react-redux";

import {usersRequest} from '../../redux/actions/usersActions';
import {Grid} from '../../shell';

interface Props {
    dispatch?:any;
    users?:any[]
    loading?:boolean;
}

interface State {

}

class UsersPage extends React.Component<Props, State> {
    componentDidUpdate() {
        Grid.init({
            gridId: 'test',
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
                    name: 'login'
                },
                {
                    name: 'group'
                }
            ]
        });
    }

    componentWillMount() {
        this.props.dispatch(usersRequest());
    }

    render() {
        const {loading, users} = this.props;

        return (
            <div>
                <h1>Users</h1>
                <div>
                    <table id="test"></table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {users, loading} = state.users;

    return {users, loading};
}

export default connect(mapStateToProps)(UsersPage);