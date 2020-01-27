import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Error from './Error';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const styles = {
    root: {
        width: '100%',
    }
}

class PageRoutes extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Router>
                    <Switch>
                        <Route path="/" render={(props) => (
                            <Home {...props} />
                        )} exact />

                        <PublicRoute
                            exact
                            path="/login"
                            component={Login}
                            loggedIn={this.props.user}
                        />

                        <PublicRoute
                            exact
                            path="/register"
                            component={Register}
                            loggedIn={this.props.user}
                        />

                        <PrivateRoute
                            exact
                            path="/profile"
                            component={Profile}
                            loggedIn={this.props.user}
                        />

                        <Route render={(props) => <Error {...props} />} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

PageRoutes.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.a.user
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(PageRoutes))