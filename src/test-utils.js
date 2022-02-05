import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { createStore, compose, applyMiddleware  } from 'redux';
import reducer from './store/rootReducer';

const composeEnhancers = compose;

export const getMockStore = (initialState) => {
    const mockStore = configureStore([thunk]);
    return mockStore(initialState);
} 
export const getStore = (initialState) => {
    return createStore(reducer, initialState,composeEnhancers(applyMiddleware(thunk)));
}

export const findByAttr = (wrapper, attr) => {
    return wrapper.find(`[data-test="${attr}"]`);
}
export const setup = (Component,props={},initialState = {}) => {
    const store = getStore(initialState)
    const wrapper = shallow(<Component {...props} store={store}/>).dive().dive();
    return wrapper;
}