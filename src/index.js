import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './store/rootReducer';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const composeEnhancers = compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Root/>
      </Router>
    </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA