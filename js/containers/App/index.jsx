import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
    render() {
        return (
            <div>
                <Link to="/users">带我去用户模块</Link>
            </div>
		);
    }
}

export default App;