import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar,
    Typography, Drawer,
    Button, IconButton,
    List, ListItem, ListItemText,
    Divider } from '@material-ui/core';
import { Menu, AccountCircle, ChevronLeft } from '@material-ui/icons';

const drawerWidth = 240;

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    title: {
      flexGrow: 1,
    },
    login: {
        color: 'white',
    },
    userAuth: {
        flex: 1,
        textAlign: 'right',
    },
    userLogo: {
        color: 'white',
        minHeight: 30,
        minWidth: 30
    },
    drawer: {
        width: drawerWidth,
        minWidth: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    chevron: {
        maxWidth: 40,
        minWidth: 40,
        maxHeight: 40,
        minHeight: 40,
        textAlign: 'right',
        marginLeft: 'auto',
        marginRight: 10,
        marginTop: 10
    }
};

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    toggleDrawerClose = () => {
        this.setState({ open: false })
    }
    toggleDrawerOpen = () => {
        this.setState({ open: true })
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <div className={classes.userAuth}>
                        { this.props.user ?
                            <div>
                            <IconButton href="/profile">
                                <AccountCircle className={classes.userLogo} />
                            </IconButton>
                            <Button onClick={this.props.onLogout}>
                                <Typography variant="subtitle1" className={classes.login}>
                                    Logout
                                </Typography>
                            </Button>
                            </div>
                        : 
                            <div>
                                <Button href="/login">
                                    <Typography variant="subtitle1" className={classes.login}>
                                        Login
                                    </Typography>
                                </Button>
                                <Button href="/register">
                                    <Typography variant="subtitle1" className={classes.login}>
                                        Register
                                    </Typography>
                                </Button>
                            </div>
                        }
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.open}
                    className={classes.drawer}
                    classes={{paper: classes.drawerPaper}}
                    ModalProps={{ onBackdropClick: this.toggleDrawerClose }}
                >
                    <Button onClick={this.toggleDrawerClose} className={classes.chevron} edge="end" color="inherit" aria-label="menu">
                        <ChevronLeft className={classes.chevronIcon} />
                    </Button>
                    <List component="nav">
                        <Divider />
                        <ListItem button component="a" href="/">
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                        { this.props.user ?
                        <span>
                        <Divider />
                        <ListItem button component="a" href="/profile">
                            <ListItemText>Profile</ListItemText>
                        </ListItem>
                        </span>
                        :
                        <span>
                            <Divider />
                            <ListItem button component="a" href="/login">
                                <ListItemText>Login</ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button component="a" href="/register">
                                <ListItemText>Register</ListItemText>
                            </ListItem>
                        </span>
                        }
                        <Divider />
                    </List>
                </Drawer>
            </div>
        )
    }
}
  
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.a.user
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Header))