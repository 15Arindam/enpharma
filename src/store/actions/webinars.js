import { GET_WEBNR, GET_WEBNRS, ERR_WEBNR, LOADN_WEBNR } from '../actions/actionTypes';
// import { data } from '../../components/webinar_data';
import { apiInst } from '../../api/endpoints';

export const getWebinars = () => dispatch => {
    dispatch({ type: LOADN_WEBNR });
    return apiInst.get('/webinars')
    .then(res => {
        dispatch({ type: GET_WEBNRS, value: res.data })
    })
    .catch(err => {
        dispatch({ type: ERR_WEBNR, value: err.message })
    })
}
export const getWebinar = (id) => dispatch => {
    dispatch({ type: LOADN_WEBNR });
    return apiInst.get('/webinar/'+id)
    .then(res => {
        dispatch({ type: GET_WEBNR, value: res.data[0] })
    })
    .catch(err => {
        dispatch({ type: ERR_WEBNR, value: err.message })
    })
}   