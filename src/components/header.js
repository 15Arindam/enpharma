import React,{ useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import { AppBar, Hidden, IconButton, Drawer, Toolbar, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { Navigation, DrawerNavs } from './navigation';
import { unsetUser } from '../store/actions/setUser';
// import { withRouter } from 'react-router';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  toolbar:{
      justifyContent: 'space-between',
    },
    appBar:{
      backgroundColor: theme.palette.background.default,
      boxShadow: 'none',
    },
    navSection:{
      width: '100%',
      fontSize: '1rem'
    },
    navSectionOnAuth:{
      display: 'flex',
      justifyContent: 'space-between'
    },
    logo:{
      fontFamily: "Pacifico",
      color: "#e3afff"
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        flexShrink: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
          }),
      },
    },
    drawerPaper: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.primary.main
    }  
}))

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  // const auth = false;
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    const classes = useStyles();
    const navStyle = !props.auth ? classes.navSection : [classes.navSection,classes.navSectionOnAuth].join(' ');
    return(
        <AppBar className={classes.appBar} position="absolute">
        <Toolbar className={classes.toolbar}>
          <Hidden smUp implementation="css">
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown>
              <div data-test="auth-childs" className={navStyle}>
                  <Navigation {...props}/>
                { props.auth && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="primary"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={menuOpen}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={()=>{props.history.push('/my-profile');handleMenuClose();}}>Profile</MenuItem>
                      <MenuItem data-test="auth-logout" onClick={()=>{props.unsetUser();handleMenuClose();}}>Logout</MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </Hidden>
            </Toolbar>
            <nav className={classes.drawer} aria-label="drawer Navigation">
              <Hidden smUp implementation="css">
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                > 
                  <DrawerNavs {...props}/>
                </Drawer>
              </Hidden>
            </nav>
      </AppBar>
    )
}
const mapStateToProps = state => {
  return {
      auth: state.isUser.userId
  };
}
const mapDispatchToProps = dispatch => {
  return {
      unsetUser: () => dispatch(unsetUser())
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);