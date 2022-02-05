import { GET_WEBNRS, GET_WEBNR, ERR_WEBNR, LOADN_WEBNR } from '../actions/actionTypes';

export const initialState = {
    data:[],
    current: null,
    loading: false,
    error: null
}

const webinar = ( state= initialState, action ) => {
    const {type, value} = action;
    switch(type){
        case GET_WEBNR:
            return{
                ...state,
                loading: false,
                current: value
            }
        case GET_WEBNRS : 
            return{
                ...state,
                data: value,
                loading: false,
            }
        case ERR_WEBNR : 
            return{
                ...state,
                error: value,
                loading: false
            }
        case LOADN_WEBNR :
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default webinar;