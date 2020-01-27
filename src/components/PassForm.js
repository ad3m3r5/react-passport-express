import React, { Component } from 'react'
import axios from 'axios';

import { connect } from 'react-redux';
import { auth } from '../redux/actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, TextField,
    Paper, Button,
    Zoom } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Lock } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    rootPaper: {
        marginTop: '0px',
        backgroundColor: grey[200],
        padding: '20px',
        borderRadius: '5px',
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

class PassForm extends Component {
    auth = (user) => {
        this.props.auth(user);
    }

    constructor(props) {
        super(props)
        this.state = {
            message: null,
            error: null,
            currpass: '',
            newpass: '',
            newpassconf: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { currpass, newpass, newpassconf } = this.state;
        this.setState({ message: null, error: null, currpass: '', newpass: '', newpassconf: '' }, () => {
            axios.post('/changepass', {currpass: currpass, newpass: newpass, newpassconf: newpassconf})
            .then(response => {
                if (response.data.user) {
                    this.auth(response.data.user)
                    this.setState({ newuser: '' })
                } if (response.data.error) {
                    this.setState({ error: response.data.error })
                } if (response.data.message) {
                    this.setState({ message: response.data.message })
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
                <Paper elevation={22} className={classes.rootPaper} >
                    {this.state.message ?
                    <Alert className={classes.alert} onClose={this.closeAlert} severity="info">{this.state.message}</Alert>
                    :
                    null }
                    {this.state.error ?
                    <Alert className={classes.alert} onClose={this.closeAlert} severity="error">{this.state.error}</Alert>
                    :
                    null }
                    <Zoom in={true} timeout={300}>
                        <Typography variant="h5" className={classes.login}>
                            <Lock style={{ fontSize: '3rem', verticalAlign: 'middle' }} /> Update Password
                        </Typography>
                    </Zoom>
                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                        noValidate autoComplete="off"
                    >
                        <Zoom in={true} timeout={300}>
                            <TextField className={classes.input}
                                id="currpass"
                                label="current password"
                                name="currpass"
                                type="password"
                                variant="filled"
                                color="primary"
                                fullWidth
                                autoFocus
                                inputProps={{ 'aria-label': 'description' }}
                                value={ this.state.currpass }
                                onChange={ this.handleChange }
                            />
                        </Zoom>
                        <Zoom in={true} timeout={300}>
                            <TextField className={classes.input}
                                id="newpass"
                                label="new password"
                                name="newpass"
                                type="password"
                                variant="filled"
                                color="primary"
                                fullWidth
                                inputProps={{ 'aria-label': 'description' }}
                                value={ this.state.newpass }
                                onChange={ this.handleChange }
                            />
                        </Zoom>
                        <Zoom in={true} timeout={300}>
                            <TextField className={classes.input}
                                id="newpassconf"
                                label="new password confirmation"
                                name="newpassconf"
                                type="password"
                                variant="filled"
                                color="primary"
                                fullWidth
                                inputProps={{ 'aria-label': 'description' }}
                                value={ this.state.newpassconf }
                                onChange={ this.handleChange }
                            />
                        </Zoom>
                        <Zoom in={true} timeout={300}>
                            <Button type="submit" variant="contained" color="primary">
                                <Typography variant="subtitle1" className={classes.submit}>
                                    UPDATE
                                </Typography>
                            </Button>
                        </Zoom>
                    </form>
                </Paper>
            </div>
        )
    }
}

PassForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    auth
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(PassForm))