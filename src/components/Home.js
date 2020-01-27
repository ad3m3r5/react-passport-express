import React, { Component } from 'react'
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, Fade } from '@material-ui/core';
import { EmojiPeople } from '@material-ui/icons';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    head: {
        color: 'black',
        textAlign: 'center',
        marginTop: '100px',
    },
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Fade in={true} timeout={500}>
                    <Typography variant="h4" className={classes.head}>
                        <EmojiPeople
                            style={{
                                fontSize: '3rem',
                                verticalAlign: 'middle'
                                }}
                        />
                        &nbsp;
                        Welcome, {this.props.user ? this.props.user.username : "guest"}
                    </Typography>
                </Fade>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.a.user
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Home))