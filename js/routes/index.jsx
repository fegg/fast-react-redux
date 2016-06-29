import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { App, LoginApp, RegisterApp, OrderApp } from '../containers'

/* react router 2.x 必须配置 browserHistory */
const routes = (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute component={LoginApp}/>
            <Route path="/login" component={LoginApp}></Route>
            <Route path="/register" component={RegisterApp}></Route>
            <Route path="/order" component={OrderApp}></Route>
        </Route>
    </Router>
);

export default routes