import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    userId : null,
    name: null
}

const isUser = ( state= initialState, action ) => {
    const {type, value} = action;
    switch(type){
        case actionTypes.SET_USER:
            return{
                ...state,
                userId: value.id,
                name: value.name
            }
        case actionTypes.UNSET_USER:
            return{
                ...initialState
            }
        default:
            return state
    }
}

export default isUser;