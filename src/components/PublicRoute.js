import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, loggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        loggedIn
        ? (
            <Redirect to={{
                pathname: '/profile',
                state: { from: props.location }
            }} />
        )
        : (
            <Component {...props} {...rest} />
        )
    )}/>
);

export default PublicRoute;