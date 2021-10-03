import { createStore, combineReducers, applyMiddleware } from 'redux';
import { employeeReducer } from './Employee/reducer';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

var reducers = {
  employee: employeeReducer,
};
var store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunkMiddleware, logger)
);
export default store;
