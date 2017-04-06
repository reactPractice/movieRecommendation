import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './reducers';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './container/App';
import Login from './components/views/Login';

import './style/index.css';


const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    {localStorage.getItem('isLoggedIn')  ? <App /> : <Login />}
  </Provider>,
  document.getElementById('root')
);