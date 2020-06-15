import React from 'react'
import { isAuthenticated } from './auth'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Activity from './pages/Activities'
import NewActivity from './pages/NewActivity'
import NotFound from './pages/NotFound'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        { ...rest}
        render={props => 
            isAuthenticated() ? (
                <Component { ...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
)

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/activity" exact component={Activity} />
                <PrivateRoute path="/activity/new" component={NewActivity} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}