import React,{ useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { makeStyles, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { connect } from 'react-redux';
import { getSlides } from '../store/actions/slides';
import BlankHOC from '../utilities/blankHOC';

const useStyles = makeStyles(theme => ({
    slides:{
        position: 'relative',
        '& .slick-prev, & .slick-next':{
            position: 'absolute',
            top: '45%',
            zIndex: 1
        },
        '& .slick-prev:before, & .slick-next:before':{
            fontSize: '4.5rem',
            color: '#fff',
            textShadow: '0 0 16px black',
            [theme.breakpoints.down('md')]:{
                fontSize: '3.5rem'
            },
            [theme.breakpoints.down('sm')]:{
                fontSize: '2.5rem'
            },
            [theme.breakpoints.down('sm')]:{
                fontSize: '2rem'
            },
        },
        '& .slick-prev':{
            left: '5%'
        },
        '& .slick-next':{
            right: '10%'
        },
        '& .slick-dots':{
            top: '90%'
        },
        '& .slick-dots li button::before':{
            fontSize: '1.25rem',
            [theme.breakpoints.down('sm')]:{
                fontSize: '1rem'
            },
            [theme.breakpoints.down('xs')]:{
                fontSize: '0.75rem'
            },
        }
    },
    content:{
        position: 'absolute',
        top: '37%',
        left: '13%',
        '& h2':{
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '0 0 7px black'
        },
        '& p':{
            textShadow: '0 5px 6px black',
            color: '#fff'
        },
        '& h2#h20':{
            color: 'aqua',
        },
        '& h2#h22':{
            color: 'khaki',
        },
        '& p#p0':{
            color: theme.palette.secondary.main
        },
        '& p#p1':{
            color: 'yellow'
        },
        [theme.breakpoints.down('sm')]:{
            '& h2':{
                fontSize: '4.5rem'
            },
            '& p':{
                fontSize: '2.5rem'
            }
        },
        [theme.breakpoints.down('xs')]:{
            '& h2':{
                fontSize: '2.5rem'
            },
            '& p':{
                fontSize: '1.5rem'
            }
        },
    }
}));

const MyCarousel = (props) => {
    const classes = useStyles();
    useEffect(() => {
        if(!props.error)
            if(!props.slides.length || props.slides.length === 1)
                props.getCarousel();
    },[props]);

    const settings = {
        autoplay: true,
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: [classes.slides].join(' '),
        adaptiveHeight: true,
        pauseOnHover: true
      };
    return (
        <div data-test="container">
        {!props.loading?
        !props.error?
        props.slides.length ?
        <Slider data-test="slides" {...settings}>
            { props.slides.map( ( slide, index ) => (
                <Card key={slide.id} square elevation={0}>
                    <CardMedia height="496" component="img" src={process.env.REACT_APP_ASSET_URL + slide.image_path}/>
                    <CardContent className={classes.content}>
                        <Typography id={"h2"+index} gutterBottom  component="h2" variant="h1">{slide._title}</Typography>
                        <Typography id={"p"+index} component="p" variant="h4">{slide._caption}</Typography>
                    </CardContent>
                </Card>
            )) }
        </Slider>:<BlankHOC>No Data Found</BlankHOC> 
        :<BlankHOC>{props.error}</BlankHOC>
        :<Skeleton variant="rect" height={496}/>}
        </div>
    );
}
const mapStateToProps = state => {
    return {
        slides: state.slides.data,
        loading: state.slides.loading,
        error: state.slides.error
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        getCarousel: () => dispatch(getSlides())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(MyCarousel);