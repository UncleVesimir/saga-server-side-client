import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, Switch} from 'react-router-dom';
import {AUTH_USER} from './actions/types';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import App from './components/app';
import reducers from './reducers';
import thunk from 'redux-thunk';
import history from './history';
import sagas from './sagas';
import {getToken} from "./storageApi";

const precheckURL = "http://localhost:3090/pre-check_auth";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(sagas);

axios.get(precheckURL, { headers:{ authorization: getToken() }})
.then(response => {
  if(response.data.tokenOK){
    store.dispatch({type:AUTH_USER});
  }
  renderApp();
})
.catch( err => {
  console.log("Error caught\n", err);
  renderApp();
})


function renderApp(){ 
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}/>      
        </Router>
      </Provider>
      , document.querySelector('.container'));
}