import React, { Component } from 'react'
import axios from 'axios';

import { connect } from 'react-redux';
import { auth } from '../redux/actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, TextField,
    Fade, Zoom,
    Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { LockOpen } from '@material-ui/icons';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    content: {
        marginTop: '100px'
    },
    login: {
        color: 'black',
        textAlign: 'center',
        marginTop: '15px',
        marginBottom: '25px',
    },
    form: {
        maxWidth: 250,
        margin: '0 auto',
        textAlign: 'center',
    },
    input: {
        margin: '10px auto',
        display: 'block',
        width: '100%',
    },
    submit: {
        color: 'white',
    },
    alert: {
        margin: '0 auto',
        maxWidth: 350,
        padding: '15px 25px'
    },
    info: {
        margin: '50px auto',
        maxWidth: 500,
        padding: '30px 60px',
    }
};

class Login extends Component {
    auth = (user) => {
        this.props.auth(user);
    }

    constructor(props) {
        super(props)
        this.state = {
            message: null,
            error: null,
            username: '',
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { username, password } = this.state;
        this.setState({ message: null, error: null, password: '' }, () => {
            axios.post('/login', {username: username, password: password})
            .then(response => {
                if (response.data.username) {
                    this.auth(response.data)
                    window.location = '/profile'
                } else if (response.data.error) {
                    this.setState({
                        error: response.data.error
                    })
                } else if (response.data.message) {
                    this.setState({
                        message: response.data.message
                    })
                }
            })
            .catch(error => {
                this.setState({
                    message: error
                })
            })
        });        
    }
    closeAlert = () => {
        this.setState({
            message: null,
            error: null
        })
    }
    render() {
        const { classes } = this.props
        
        return (
            <div className={classes.root}>
                {this.props.user ?
                <Fade in={true} timeout={1000}>
                    <Alert className={classes.info} severity="info">
                        You are already logged in.
                    </Alert>
                </Fade>
                :
                <div className={classes.content}>
                    
                    {this.state.message ?
                    <Alert className={classes.alert} onClose={this.closeAlert} severity="info">{this.state.message}</Alert>
                    :
                    null }
                    {this.state.error ?
                    <Alert className={classes.alert} onClose={this.closeAlert} severity="error">{this.state.error}</Alert>
                    :
                    null }
                    <Zoom in={true} timeout={600}>
                        <Typography variant="h3" className={classes.login}>
                            <LockOpen style={{ fontSize: '3rem', verticalAlign: 'middle' }} /> Login
                        </Typography>
                    </Zoom>
                        <form
                            className={classes.form}
                            onSubmit={this.handleSubmit}
                            noValidate autoComplete="off"
                        >
                            <Zoom in={true} timeout={600}>
                                <TextField className={classes.input}
                                    id="username"
                                    label="username"
                                    name="username"
                                    type="text"
                                    variant="filled"
                                    color="primary"
                                    fullWidth
                                    autoFocus
                                    inputProps={{ 'aria-label': 'description' }}
                                    value={ this.state.username }
                                    onChange={ this.handleChange }
                                />
                            </Zoom>
                            <Zoom in={true} timeout={600}>
                                <TextField className={classes.input}
                                    id="password"
                                    label="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                    color="primary"
                                    fullWidth
                                    inputProps={{ 'aria-label': 'description' }}
                                    value={ this.state.password }
                                    onChange={ this.handleChange }
                                />
                            </Zoom>
                            <Zoom in={true} timeout={600}>
                                <Button type="submit" variant="contained" color="primary">
                                    <Typography variant="subtitle1" className={classes.submit}>
                                        LOGIN
                                    </Typography>
                                </Button>
                            </Zoom>
                        </form>
                </div>
                }
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.a.user
    };
};

const mapDispatchToProps = {
    auth
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))