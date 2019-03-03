import * as React from 'react';
import {ContactScene} from '../scenes/contact_scene';
import {Button, WithStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Layout, styles} from './components/layout';
import withStyles from '@material-ui/core/styles/withStyles';

interface OwnProps extends WithStyles<typeof styles> {
    scene: ContactScene;
}

export const ContactComponent = withStyles(styles)(({classes, scene}: OwnProps) => {
    return (
        <Layout>
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Contact page
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Hi I'm Joris, this is just a static page with a back button.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => scene.onClick()}>
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
