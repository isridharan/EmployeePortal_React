import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import EmployeeContainer from './Employee/EmployeeContainer';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <EmployeeContainer />
  </Provider>,
  document.getElementById('root')
);
