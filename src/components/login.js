import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { checkValidity, email_check, phone_check, pwd_check, name_check } from '../utilities/validation';
import { login, register } from '../store/actions/login';
import { LOADING } from '../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '83vh',
  },
  image: {
    backgroundImage: 'url(/form-side-3.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [signUp,setSignUp] = useState(true);
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState('');
  const [password,setPassword] = useState('');
  const [allowSubmit,setAllowSubmit] = useState(false);
  const [err,setErr] = useState({
    "fname":false,"lname":false,"email":false,"contact":false,"password":false
  });

  const reCheck = useCallback((isSignUp) => { // recheck validation on toggle between sign up & sign In
    return isSignUp ? (
      checkValidity(fname,name_check) &&
      checkValidity(lname,name_check) &&
      checkValidity(contact,phone_check) &&
      checkValidity(email,email_check) &&
      checkValidity(password,pwd_check)
    ):(
      checkValidity(email,email_check) &&
      checkValidity(password,pwd_check)
    )
  },[fname,lname,contact,email,password])

  useEffect(() => { //  validation check
    setAllowSubmit(reCheck(signUp))
    return () => {
        setAllowSubmit(false)
    }
  },[signUp,reCheck])

  const changeHandler = (e,setMethod,validRule) => {// error check
    const { name, value } = e.target;
    let error = {...err};
    error[name] = !checkValidity(value,validRule);
    setMethod(value);
    setErr(error);
  }

  useEffect(() => { // redirect on Authed
    props.auth && props.history.push('/my-profile');
  },[props])

  const toggleSignUpSignIn = () => {
    const val = signUp
      setSignUp( prevState => !prevState)
      setAllowSubmit(reCheck(!val))
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    props.loading();
    const signUpdata = {     //  sign up data 
      first_name : fname?fname:null,
      last_name : lname?lname:null,
      phone_number : contact?contact:null
      }; 
    const loginData = {
      email: email,
      password: password
    }
    if(signUp){
      await props.register({...signUpdata,...loginData});
      
    }
    else{
      await props.login({...loginData});
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUp?'Register': 'Sign in'}
          </Typography>
          <Typography color="secondary" component="h2" variant="h5">
            {props.error}
          </Typography>
          <form data-test="form" className={classes.form} noValidate onSubmit={e=>submitHandler(e)}>
            <Grid container spacing={2}>
              {signUp && <>
                <Grid item xs={12} sm={6}>
                <TextField data-test="fname" onChange={e=>changeHandler(e,setFname,name_check)} name="fname" label="First Name" 
                  value={fname} fullWidth autoFocus error={err["fname"]} helperText={err["fname"] && "Enter a valid Name"}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField data-test="lname" onChange={e=>changeHandler(e,setLname,name_check)} name="lname" label="Last Name"
                  value={lname} fullWidth error={err["lname"]} helperText={err["lname"] && "Enter a valid Surname"}/>
                </Grid>
              </>}
              <Grid item xs={12}>
              <TextField data-test="email" onChange={e=>changeHandler(e,setEmail,email_check)} name="email" label="Email"
                value={email} fullWidth error={err["email"]} helperText={err["email"] && "Enter a valid Email"}/>
              </Grid>
              {signUp && 
                  <Grid item xs={12}>
                  <TextField data-test="contact" onChange={e=>changeHandler(e,setContact,phone_check)} name="contact" label="Contact no."
                  value={contact} fullWidth error={err["contact"]} helperText={err["contact"] && "Enter a valid Number"}/>
              </Grid>}
              <Grid item xs={12}>
                <TextField data-test="password" type="password" onChange={e=>changeHandler(e,setPassword,pwd_check)} name="password" label="Password"
                  value={password} fullWidth error={err["password"]} helperText={err["password"] && "Password length should be min. 6"}/>
              </Grid>
            </Grid>
            <Button
              type="submit" data-test="submit-btn" fullWidth disabled={!allowSubmit} variant="contained" color="primary" className={classes.submit}>
              {signUp?"Register":"Sign In"}
            </Button>
            <Grid container>
              <Grid item>
              {signUp?"Already have an account? ":"Don't have an account? "}
              <Button data-test="authMode-test" onClick={toggleSignUpSignIn}>
                  {signUp?"Sign In":"Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = state => {
  return {
      auth: state.isUser.userId,
      error: state.auth.error,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      login: (data) => dispatch(login(data)),
      loading: () => dispatch({ type: LOADING }),
      register: (data) => dispatch(register(data))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);