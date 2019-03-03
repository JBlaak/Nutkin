import * as React from 'react';
import {Button, Theme, WithStyles} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme: Theme) =>
    createStyles({
        card: {
            height: '350px',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
    });

interface OwnProps extends WithStyles<typeof styles> {
    title: string;
    description: string;
    onClick: () => void;
}

export const CardComponent = withStyles(styles)(({classes, title, description, onClick}: OwnProps) => {
    return (
        <Grid item sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image="http://lorempixel.com/400/225/people/" />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography>{description}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={onClick}>
                        View
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
});
