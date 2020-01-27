import React, { Component } from 'react'

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, Fade,
    Card, CardContent,
    Collapse, IconButton,
    Paper } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import { Person, ExpandMore } from '@material-ui/icons';

import UserForm from './UserForm';
import PassForm from './PassForm';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    card: {
        maxWidth: 500,
        margin: '60px auto',
        marginBottom: '100px',
        backgroundColor: indigo[500],
        color: 'white',
    },
    alert: {
        margin: '50px auto',
        maxWidth: 500,
        padding: '30px 60px'
    },
    iconWrap: {
        margin: '0 auto',
        textAlign: 'center'
    },
    expand: {
        transition: 'transform .7s',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        outline: 'none',
    },
    expanded: {
    },
    expIcon: {
        marginLeft: 'auto',
    },
    dropCard: {
        textAlign: 'right',
    },
    dropPaper: {
        backgroundColor: indigo[400],
        color: 'white',
    },
    dropTitle: {
        display: 'block',
    }
}

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expandedUser: false,
            expandedPass: false,
        }
    }
    handleExpandUser = () => {
        this.setState({ expandedUser: !this.state.expandedUser })
    }
    handleExpandPass = () => {
        this.setState({ expandedPass: !this.state.expandedPass })
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                {this.props.user ?
                <Fade in={true} timeout={600}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {this.props.user.username}
                            </Typography>
                        </CardContent>
                        <Typography className={classes.iconWrap} >
                            <Person
                                style={{ fontSize: 150 }}
                                className={classes.icon}
                            />
                        </Typography>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                This is your personalized profile
                            </Typography>
                        </CardContent>

                        <CardContent className={classes.dropCard} >
                            <Paper elevation={12} className={classes.dropPaper} >
                                <Typography className={classes.dropTitle} variant="subtitle1">
                                    Change Username &nbsp;
                                    <IconButton
                                        className={classes.expand}
                                        style={{ transform: ((this.state.expandedUser) ? 'rotate(180deg)' : 'rotate(0deg)' )}}
                                        onClick={this.handleExpandUser}
                                        aria-expanded={this.state.expandedUser}
                                        aria-label="show more"
                                    >
                                        <ExpandMore className={classes.expIcon} />
                                    </IconButton>
                                </Typography>
                            </Paper>
                        </CardContent>
                        <Collapse in={this.state.expandedUser} timeout="auto" unmountOnExit>
                            <CardContent>
                                <UserForm />
                            </CardContent>
                        </Collapse>

                        <CardContent className={classes.dropCard} >
                            <Paper elevation={12} className={classes.dropPaper} >
                                <Typography className={classes.dropTitle} variant="subtitle1">
                                    Update Password &nbsp;
                                    <IconButton
                                        className={classes.expand}
                                        style={{ transform: ((this.state.expandedPass) ? 'rotate(180deg)' : 'rotate(0deg)' )}}
                                        onClick={this.handleExpandPass}
                                        aria-expanded={this.state.expandedPass}
                                        aria-label="show more"
                                    >
                                        <ExpandMore className={classes.expIcon} />
                                    </IconButton>
                                </Typography>
                            </Paper>
                        </CardContent>
                        <Collapse in={this.state.expandedPass} timeout="auto" unmountOnExit>
                            <CardContent>
                                <PassForm />
                            </CardContent>
                        </Collapse>
                    </Card>
                </Fade>
                :
                <Fade in={true} timeout={1000}>
                    <Alert className={classes.alert} severity="error">
                        You must login or register to view this page.
                    </Alert>
                </Fade>
                }
            </div>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.a.user
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Profile))