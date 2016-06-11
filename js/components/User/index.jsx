import React, { Component } from 'react';
import { Link } from 'react-router';

import './user.css';

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, name } = this.props;
        const detail = `/users/${id}`;

        return (
            <div className="user">
                <h3>{id}</h3>
                <Link to={detail}>{name}</Link>
            </div>
        );
    }
}

export default User;