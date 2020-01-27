import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Toolbar, Typography,
    Grid, Divider,
    Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { GitHub } from '@material-ui/icons';

const styles = {
    root: {
        width: '100%',
    },
    footer: {
        top: 'auto',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        backgroundColor: indigo[500],
        zIndex: 1,
    },
    flex: {
        flex: 1,
    },
    title: {
      flexGrow: 1,
    },
    grid: {
        color: 'white'
    },
    message: {
        color: 'white'
    },
    divider: {
        margin: '0px 4px',
        backgroundColor: 'white',
        height: 'auto',
        alignSelf: 'stretch'
    },
    github: {
        marginRight: '5px',
    },
    link: {
        textTransform: 'none',
        color: 'white'
    }
};

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { classes } = this.props

        return (
            <Toolbar className={classes.footer}>
                <Grid
                    container
                    justify="center" alignItems="center" alignContent="center"
                    className={classes.grid}
                >
                    <Button href="https://github.com/ad3m3r5" style={{color:'white'}} className={classes.link}>
                        <GitHub className={classes.github} />
                        <Typography className={classes.message}>ad3m3r5</Typography>
                    </Button>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Button href="https://github.com/ad3m3r5" className={classes.link}>
                        <Typography variant="subtitle1" className={classes.message}>
                            react_passport_express
                        </Typography>
                    </Button>
                </Grid>
            </Toolbar>
        )
    }
}
  
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)