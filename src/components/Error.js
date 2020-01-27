import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, Fade } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    error: {
        maxWidth: 450,
        margin: '100px auto',
        padding: '25px 40px',
        textAlign: 'center',
        fontSize: 25,
    }
}

class Error extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Fade in={true} timeout={750}>
                    <Alert className={classes.error} severity="error">
                        <Typography variant="h3">
                            404 Error
                        </Typography>
                        <Typography variant="subtitle1">
                            The page at [{this.props.location.pathname}] could not be found.
                        </Typography>
                    </Alert>
                </Fade>
            </div>
        )
    }
}

Error.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error)