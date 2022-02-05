import { GET_SLIDES, ERR_SLIDES, LOADN_SLIDES } from '../actions/actionTypes';

export const initialState = {
    data: [],
    loading: false,
    error: null
}

const slides = ( state= initialState, action ) => {
    const {type, value} = action;
    switch(type){
        case GET_SLIDES : 
            return{
                ...state,
                data: value,
                loading: false,
            }
        case ERR_SLIDES : 
            return{
                ...state,
                error: value,
                loading: false
            }
        case LOADN_SLIDES :
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default slides;