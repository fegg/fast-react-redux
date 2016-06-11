import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../actions/user';
import axios from 'axios';
import { UserList } from '../../components';

const mapStateToProps = state => {
    return {
        users: state.user.users,
        usersById: state.user.usersById
    };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userAction, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class UserListApp extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { actions } = this.props;

        axios.get('/mock/users.json').then(function (ret) {
            if(ret.status === 200) {
                actions.setUser(ret.data);
            }
        });   
    } 

    render() {
        return (
            <div>
                <UserList { ...this.props } />
            </div>
        );
    }
}

export default UserListApp;