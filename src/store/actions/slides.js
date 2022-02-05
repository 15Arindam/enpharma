import { GET_SLIDES, ERR_SLIDES, LOADN_SLIDES } from '../actions/actionTypes';
import { apiInst } from '../../api/endpoints';

export const getSlides = () => dispatch => {
    dispatch({ type: LOADN_SLIDES });
    return apiInst.get('/slides')
    .then(res => {
        dispatch({ type: GET_SLIDES, value: res.data })
    })
    .catch(err => {
        dispatch({ type: ERR_SLIDES, value: err.message })
    })
}   