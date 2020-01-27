import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        loggedIn
        ? (
            <Component {...props} {...rest} />
        )
        : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )}/>
);

export default PrivateRoute;