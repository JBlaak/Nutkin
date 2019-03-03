import * as React from 'react';
import {HomeScene} from '../scenes/home_scene';
import {Layout, styles} from './components/layout';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {CardComponent} from './components/card';

interface OwnProps extends WithStyles<typeof styles> {
    scene: HomeScene;
}

export const HomeComponent = withStyles(styles)(({scene, classes}: OwnProps) => {
    return (
        <Layout>
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Routing for web
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Have Nutkin react to changes in your address bar while still maintaining the power of
                            navigating using scenes and composable navigators.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => scene.onContactClick()}>
                                        Contact through onClick
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={props => <a href="/contact" {...props} />}>
                                        Direct link to contact
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        <CardComponent
                            title="User 1"
                            description="View this beautiful person"
                            onClick={() => scene.onUserClick(1)}
                        />
                        <CardComponent
                            title="User 2"
                            description="View somebody else"
                            onClick={() => scene.onUserClick(2)}
                        />
                    </Grid>
                </div>
            </main>
        </Layout>
    );
});
