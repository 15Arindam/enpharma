import { combineReducers } from 'redux';

import alerts from './reducers/alerts';
import auth from './reducers/login';
import webinars from './reducers/webinars';
import slides from './reducers/slides';
import isUser from './reducers/setUser';
import products from './reducers/products';

const rootReducer = combineReducers({
    auth,isUser,alerts,webinars,slides,products
})

export default rootReducer ;