import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { HIDE_ALERT } from '../store/actions/actionTypes';

export const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const MyAlert = ({ alerts, hideAlert }) => {
  const classes = useStyles();
  const handleClose = (e, id) => {
      e.preventDefault()
    hideAlert(id)
  };
  const vertical= 'top', horizontal= 'center';
  return alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={classes.root}>
          <Snackbar data-test="snackbar" anchorOrigin={{ vertical, horizontal }} open onClose={e=>handleClose(e,alert.id)}>
            <Alert data-test="alert" onClose={e=>handleClose(e,alert.id)} severity={alert.type}>
                {alert.msg}
            </Alert>
          </Snackbar>
        </div>
      )
  )
}
const mapStateToProps = state => {
    return { alerts: state.alerts }
}
const mapDispatchToProps = dispatch => {
    return {
        hideAlert: (id) => dispatch({ type: HIDE_ALERT, value: id })
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyAlert);