import React, { Component } from 'react';
import User from '../User';

class UserList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const users = this.props.usersById.map(user => {
            return (<User key={user.id} id={user.id} name={user.name} />);
        });

        return (
            <div>
                {users}
            </div>
        );
    }
}

export default UserList;