import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './reducers'
import CurrentLoans from './components/CurrentLoans';
import Header from './components/Header';

ReactDOM.render(
  <Provider store={store}>
    <Header/>
    <CurrentLoans/>
  </Provider>,
  document.getElementById('root')
);