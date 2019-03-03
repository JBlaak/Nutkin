import * as React from 'react';
import {ViewUserScene} from '../scenes/view_user_scene';
import {Button, WithStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Layout, styles} from './components/layout';
import withStyles from '@material-ui/core/styles/withStyles';

interface OwnProps extends WithStyles<typeof styles> {
    scene: ViewUserScene;
}

export const ViewUserComponent = withStyles(styles)(({classes, scene}: OwnProps) => {
    return (
        <Layout>
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            User {scene.userId}
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            You are viewing a specific user
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => scene.onBackClick()}>
                                        Back to somewhere
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
});
