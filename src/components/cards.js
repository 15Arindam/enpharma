import React from 'react';
import { Grid,Card,CardActions,CardMedia,CardContent,Button,Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

const MyCard = ({ card }) => {
    
    const classes = useStyle();

    return(
        <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image={card.image_path}
            title="Image title"
            />
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                { card.title }
            </Typography>
            <Typography>
                { card.description.substr(0,50) }
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" color="primary">
                <Link style={{ textDecoration: 'none' }} to={`/webinars/`+ card.id}>
                    Read more
                </Link>
            </Button>
            </CardActions>
        </Card>
        </Grid>
    )
}
export default MyCard;