import {
  fetch_lookup_started,
  fetch_lookup_succeeded,
  fetch_lookup_failed,
  create_employee_started,
  create_employee_succeeded,
  create_employee_failed,
} from './action';
import { MessageType } from '../Common/Common';
import { act } from 'react-dom/test-utils';

var initState = {
  Employees: [],
  Lookups: [],
  IsLoading: false,
  Messages: [],
  IsEmployeeCreationSuccessful: false,
};

export const employeeReducer = (state = initState, action) => {
  switch (action.type) {
    case fetch_lookup_started:
      return {
        ...state,
        IsLoading: true,
        Messages: [],
      };
    case fetch_lookup_succeeded:
      return {
        ...state,
        Lookups: action.payload.data,
        IsLoading: false,
        Messages: [],
      };
    case fetch_lookup_failed:
      return {
        ...state,
        Lookups: [],
        IsLoading: false,
        Messages: [
          ...state.Messages,
          {
            type: MessageType.error,
            message: 'Error in Fetching Lookup Data',
          },
        ],
      };
    case create_employee_started:
      return {
        ...state,
        IsEmployeeCreationSuccessful: false,
        IsLoading: true,
        Messages: [],
      };
    case create_employee_succeeded:
      return {
        ...state,
        IsEmployeeCreationSuccessful: true,
        Employees: [...state.Employees, action.payload.data],
        Messages: [
          ...state.Messages,
          {
            type: MessageType.success,
            message: 'Employee has been created successfully',
          },
        ],
      };
    case create_employee_failed:
      return {
        ...state,
        IsLoading: false,
        IsEmployeeCreationSuccessful: false,
        Messages: [
          ...state.Messages,
          {
            type: MessageType.error,
            message: 'Error creating Employee',
          },
        ],
      };
    default:
      return state;
  }
};
