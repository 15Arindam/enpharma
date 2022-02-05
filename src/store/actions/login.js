import { dbInst } from "../../api/endpoints"
import { LOGGED_IN, REGISTERED, ERROR } from "./actionTypes"
import { setUser } from "./setUser";
import { setAlert } from "./alerts";

export const login = (data) => dispatch => {
    return dbInst.post('/signin',data)
    .then(res => {
        if(res.data.results === 'not a user'){
            throw new Error('Invalid Username or Password!');   
        }
        const {first_name} = res.data.data[0]
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('expiryDate',Date.now()+3600000);
        dispatch({ type: LOGGED_IN, value: { data: res.data } })
        dispatch(setUser())
        dispatch(setAlert(`Welcome ${first_name}!`,'success'))
    })
    .catch(err => {
        dispatch({ type: ERROR, value: err.message })
    })
}

export const register = (data) => dispatch => {
    const {email,password} = data;
    return dbInst.post('/signup',data)
    .then(async(res) => {
        // console.log(res.data);
        await dispatch({ type: REGISTERED, value: { data: res.data } })
        dispatch(login({ email: email, password: password }));
    })
    .catch(err => {
        dispatch({ type: ERROR, value: err.message })
    })
}