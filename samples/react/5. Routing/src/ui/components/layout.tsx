import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import {CallSplit} from '@material-ui/icons';

export const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        icon: {
            marginRight: theme.spacing.unit * 2,
        },
        heroUnit: {
            backgroundColor: theme.palette.background.paper,
        },
        heroContent: {
            maxWidth: 600,
            margin: '0 auto',
            padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        },
        heroButtons: {
            marginTop: theme.spacing.unit * 4,
        },
        layout: {
            width: 'auto',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
                width: 1100,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        cardGrid: {
            padding: `${theme.spacing.unit * 8}px 0`,
        },
    });

interface OwnProps extends WithStyles<typeof styles> {
    children?: React.ReactNode;
}

const LayoutComponent = ({classes, children}: OwnProps) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <CallSplit className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Routing sample
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </React.Fragment>
    );
};

export const Layout = withStyles(styles)(LayoutComponent);
