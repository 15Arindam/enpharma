import React, { useEffect } from 'react';
import { Container, Paper, makeStyles, Typography, CardMedia, Card, Avatar, ListItemAvatar, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { getWebinar } from '../store/actions/webinars';
import BlankHOC from '../utilities/blankHOC';

const useStyles = makeStyles(theme=>({
    root:{
        padding: theme.spacing(5,0),
        backgroundColor: theme.palette.background.default
    },
    cardMedia:{
        [theme.breakpoints.down('sm')]:{
            height: '53vw'
        }
    },
    card:{
        padding: theme.spacing(3)
    },
    content:{
        color: theme.palette.text.primary
    }
}))

const getRandomColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

const Webinar = (props) => {
    const classes = useStyles();

    useEffect(() => {
        let { id } = props.match.params;
        id = Number.parseInt(id);
        if(!props.error)
            if(( !props.webinar ) || ( props.webinar.id !== id ))
                props.getWebinar(id)
    },[props])

    return(
        <>
            <Paper data-test="container" className={classes.root} elevation={0}>
                {!props.loading?
                !props.error?
                props.webinar?
                <Container maxWidth="md">
                <Card square elevation={0}>
                    <CardMedia className={classes.cardMedia} data-test="embed-id" height="528" frameBorder="0" 
                        component="iframe" image={"https://www.youtube-nocookie.com/embed/" + props.webinar.embed_id}/>
                </Card>
                <Card className={classes.card} square elevation={0}>
                        <br/>
                        <br/>
                    <Typography data-test="title" component="h3" variant="h3">{props.webinar.title}</Typography>
                        <br/>
                    <Divider/>
                        <br/>
                    <Typography color="secondary" component="h5" variant="h6">HOSTS</Typography>
                    {props.webinar && props.webinar._authors.map(host => {
                        const initials = host.split(' ').map( i => i.charAt(0) )
                        return(
                            <List key={host}>
                                <ListItem disableGutters>
                                    <ListItemAvatar>
                                        <Avatar data-test="avatar" style={{ backgroundColor: `#${getRandomColor()}` }}>{initials[0] + initials[1]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={host}/>
                                </ListItem>
                            </List>
                        )
                    })}
                </Card>
                <br/>
                <br/>
                <List>
                    <ListItem disableGutters>
                        <ListItemText data-test="date" primary={'Last Updated: ' + new Date(props.webinar.last_updated).toDateString()}/>
                    </ListItem>
                </List>
                <br/>
                <Typography data-test="body" color="primary" className={classes.content}>
                    {props.webinar.description}
                </Typography>
                </Container>
                :<BlankHOC>No data</BlankHOC>
                :<BlankHOC>{props.error}</BlankHOC>
                :<BlankHOC>Loading...</BlankHOC>}
            </Paper>
        </>
    )
}
const mapStateToProps = state => {
    return {
        webinar: state.webinars.current,
        loading: state.webinars.loading,
        error: state.webinars.error
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getWebinar: (id) => dispatch(getWebinar(id))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Webinar);