import React from 'react';
import { makeStyles, ListItem, ListItemText, List, Divider, IconButton } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        justifyContent: 'space-between',
        '& div':{
            display: 'flex'
        },
        '& a':{
            margin: 'auto 7px',
            textDecoration: 'none !important',
            color: theme.palette.navLink
        },
        '& a.active, & a:hover':{
            color: theme.palette.activeNavLink
        }
    },
    img:{
        width: 41,
        height: 41
    },
    drawerTitle:{
        minHeight: '64px',
        textAlign: 'center'
    },
    drawerNav:{
        '& a':{
            textDecoration: 'none !important',
            color: theme.palette.navLink
        },
        '& a.active, & a:hover':{
            color: theme.palette.activeNavLink
        }
    }
}));

export const Navigation = ({auth}) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <div>
                <NavLink to="/"><img className={classes.img} src="/logo.png" alt="logo"/></NavLink>
                <NavLink exact to="/">HOME</NavLink>
                <NavLink to="/webinars">WEBINARS</NavLink>
                <NavLink to="/products">PRODUCTS</NavLink>
            </div>
            {!auth && <NavLink to="/login">LOGIN</NavLink>}
        </div>
    )
}
export const DrawerNavs = ({auth, unsetUser, history}) => {
    const classes = useStyles();
    return(
        <List className={classes.drawerNav}>
            <div className={classes.drawerTitle}>
                { auth ? 
                    <IconButton onClick={e=>{e.preventDefault();history.push('/my-profile')}} color="primary">
                        <AccountCircle/>
                    </IconButton>
                    : <img className={classes.img} src="/logo.png" alt="logo"/>
                }
            </div>
            <Divider/>
            <NavLink exact to="/">
                <ListItem button>
                <ListItemText primary="HOME" />
                </ListItem>
            </NavLink>
            <NavLink to="/webinars">
                <ListItem button>
                <ListItemText primary="WEBINARS" />
                </ListItem>
            </NavLink>
            <NavLink to="/products">
                <ListItem button>
                <ListItemText primary="PRODUCTS" />
                </ListItem>
            </NavLink>
            {!auth && <NavLink to="/login">
                <ListItem button>
                <ListItemText primary="LOGIN" />
                </ListItem>
            </NavLink>}
            {auth && <Link to="/#" data-test="logout" onClick={e=>{e.preventDefault();unsetUser()}}>
                <ListItem button>
                <ListItemText primary="LOGOUT" />
                </ListItem>
            </Link>}
        </List>
    )
}