import React from 'react';
import { Typography, makeStyles, Grid, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        contain: 'content',
        '& a':{
          textDecoration: 'none !important',
          color: theme.palette.link
        },
        '& a.active, & a:hover':{
            color: theme.palette.primary.dark
        }
    },
    copyright:{
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: theme.spacing(3,0)
    },
    container:{
      padding: theme.spacing(6),
    },
    social:{
      display: 'flex'
    },
    fb:{
      '&:hover':{
        backgroundColor: '#3b5998'
      }
    },
    inst:{
      '&:hover':{
        backgroundColor: '#833ab4'
      }
    }
}))

const Footer = () => {
    const classes = useStyles();

    const Copyright = () => {
        return (
          <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/">
              En Pharma Inc.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    return(
        <footer className={classes.footer}>
          <Grid data-test="footer-sec" container className={classes.container} spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
            <img src="/org_title.png" width="60%" alt="organisation Name"/>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              Achieving mastery since 2000, Pharmaceutical Industry, Gitanjali Park SEZ, Life Sciences, TCS TEAM OSPOD 2020
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
            <Typography variant="h5" color="textSecondary" component="h3">
              LINKS
            </Typography>
              <List>
                <Link to="/about-us">
                  <ListItem disableGutters>
                    <ListItemText primary="About Us"/>
                  </ListItem>
                </Link>
                <Link to="/contact-us">
                  <ListItem disableGutters>
                    <ListItemText primary="Contact Us"/>
                  </ListItem>
                </Link>
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
            <Typography variant="h5" color="textSecondary" component="h3">
              FOLLOW US
            </Typography>
            <List className={classes.social}>
                <a rel="noopener noreferrer" target="_blank" href="https://facebook.com">
                  <ListItemAvatar>
                  <Avatar className={classes.fb}>
                    <Facebook/>
                  </Avatar>
                  </ListItemAvatar>
                </a>
                <a rel="noopener noreferrer" target="_blank" href="https://instagram.com">
                  <ListItemAvatar>
                  <Avatar className={classes.inst}>
                    <Instagram/>
                  </Avatar>
                  </ListItemAvatar>
                </a>
              </List>
            </Grid>
          </Grid>
          <Copyright />
      </footer>
    )
}
export default Footer;