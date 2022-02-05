import { GET_PRODUCTS, ERR_PRODUCTS, LOADN_PRODUCTS} from '../actions/actionTypes';
import { apiInst } from '../../api/endpoints';

export const getProducts = () => dispatch => {
    dispatch({ type: LOADN_PRODUCTS });
    return apiInst.get('/products')
    .then(res => {
        dispatch({ type: GET_PRODUCTS, value: res.data })
    })
    .catch(err => {
        dispatch({ type: ERR_PRODUCTS, value: err.message })
    })
}