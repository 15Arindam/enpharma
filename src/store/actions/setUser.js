import {SET_USER,UNSET_USER} from '../actions/actionTypes';
import {setAlert} from './alerts';

export const setUser = () => dispatch => {
    const token = localStorage.getItem('token');
    const { first_name, id } = JSON.parse(JSON.parse(atob(token.split('.')[1])).data)[0];
    return new Promise((res,rej)=>{
        res(dispatch({ type: SET_USER, value: { name: first_name, id: id } }))
    })  
}

export const unsetUser = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    dispatch({ type: UNSET_USER });
    dispatch(setAlert('Successfully Logged Out','success'));
}