import React, { Component } from 'react';
import { Link } from 'react-router';

import './user.css';

class User extends Component {
    constructor(props) {
        super(props);
    }

    _handleClick() {
        console.log(this);
    }

    render() {
        const { id, name } = this.props;
        const detail = `/users/${id}`;

        return (
            <div className="user">
                <h3 onClick={this._handleClick.bind(this)}>{id}</h3>
                <Link to={detail}>{name}</Link>
            </div>
        );
    }
}

export default User;