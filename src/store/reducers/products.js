import { GET_PRODUCTS, ERR_PRODUCTS, LOADN_PRODUCTS } from '../actions/actionTypes';

export const initialState = {
    data: [],
    loading: false,
    error: null
}

const products = ( state= initialState, action ) => {
    const {type, value} = action;
    switch(type){
        case GET_PRODUCTS : 
            return{
                ...state,
                data: value,
                loading: false,
            }
        case ERR_PRODUCTS : 
            return{
                ...state,
                error: value,
                loading: false
            }
        case LOADN_PRODUCTS :
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default products;