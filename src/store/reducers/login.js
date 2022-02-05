import {LOGGED_IN, REGISTERED, ERROR, LOADING} from '../actions/actionTypes';

export const initialState = {
    error: null,
    response: null,
    loading: false,
}

const AuthReducer = (state = initialState, action) => {
    const {type, value} = action;
    switch(type){
        case LOADING :
            return{
                ...state,
                loading: true
            }
        case ERROR :
            return{
                ...state,
                error: value,
                loading: false
            }
        case LOGGED_IN : 
            return{
                ...state,
                response: value.data,
                error: null,
                loading: false
            }
        case REGISTERED :
            return {
                ...state,
                response: value.data,
                error:null
            }
        default:
            return{
                ...state
            }
    }
}

export default AuthReducer;