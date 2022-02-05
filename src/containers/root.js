import React, { useEffect } from 'react';
import { CssBaseline, makeStyles, Backdrop, CircularProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
import MyAlert from '../components/alerts';
import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from './home';
import { Switch, Route, useHistory } from 'react-router-dom';
import Webinar from '../pages/webinar';
import WebinarList from './webinarList';
import ProdList from './productList';
import { connect } from 'react-redux';
import {setUser} from '../store/actions/setUser';
import login from '../components/login';
import Error from '../pages/error';
import AboutUs from '../pages/about-us';
import ContactUs from '../pages/contact-us';
import MyProfile from '../pages/my-profile';

const useStyles = makeStyles(theme => ({
  rootContent: {
    padding: theme.spacing(8, 0, 6),
    marginTop: theme.spacing(8)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const theme = createMuiTheme({
  palette:{
    navLink: '#969696',
    activeNavLink: '#3f51b5',
    link: '#3f51b5'
  }
});

const Root = (props) => {
  const classes = useStyles();
  const history = useHistory();
  
  useEffect(() => {
    const { auth, setUser } = props;
    const token = localStorage.getItem('token');
    if(token && !auth){
      setUser();
    }
  },[props]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Backdrop data-test="backdrop" className={classes.backdrop} open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MyAlert/>
      {/* Header */}
      <Header history={history}/>
      {/* End Header */}
      <main className={classes.rootContent}>
        {/* Hero unit */}
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/webinars/:id" component={Webinar}/>
          <Route path="/webinars" component={WebinarList}/>
          <Route path="/products" component={ProdList}/>
          <Route path="/login" component={login}/>
          <Route path="/about-us" component={AboutUs}/>
          <Route path="/contact-us" component={ContactUs}/>
          <Route path="/my-profile" component={MyProfile}/>
          <Route component={Error}/>
        </Switch>
      </main>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
      </ThemeProvider>
  );
}
const mapStateToProps = state => {
  return {
      auth: state.isUser.userId,
      loading: state.auth.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      setUser: () => dispatch(setUser())
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Root);