import React,{ useEffect } from 'react';
import MyCarousel from '../components/carousel';
import MyCard from '../components/cards';
import { makeStyles, Container, AppBar, Typography, Grid } from '@material-ui/core';
import { getWebinars } from '../store/actions/webinars';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    featured:{
        fontFamily: 'Didact Gothic, sans-serif',
        padding: theme.spacing(2),
        textAlign: 'center',
        [theme.breakpoints.down('sm')]:{
            fontSize: '7vw',
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '10vw',
        },
        color:'#ff79d6'
    },
    heroContent: {
        paddingBottom: theme.spacing(6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
}))

const HomePage = (props) => {
    const classes = useStyles();
    useEffect(() => {
        if(!props.error)
            if(!props.webinars.length || props.webinars.length === 1)
                props.getWebinars();
    },[props]);

    return(
        <>
            <div className={classes.heroContent}>
            <Container disableGutters maxWidth="xl">
                <MyCarousel />
            </Container>
            </div>
            <AppBar position="relative">
            <Typography data-test="home-heading" className={classes.featured} variant="h2" color="inherit" noWrap>
                Upcoming Webinars
            </Typography>
            </AppBar>
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid data-test="webinars" container spacing={4}>
                {props.webinars.slice(0,6).map((card,i) => (
                    <MyCard key={i} card={card}/>
                ))}
            </Grid>
            </Container>
        </>
    )
}
const mapStateToProps = state => {
    return {
        webinars: state.webinars.data,
        loading: state.webinars.loading,
        error: state.webinars.error
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        getWebinars: () => dispatch(getWebinars())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);