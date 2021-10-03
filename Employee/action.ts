import { LookupData } from '../Data/Lookups';
import { IEmployee } from './Employee';

export const fetch_lookup_started = 'fetch_lookup_started';
export const fetch_lookup_succeeded = 'fetch_lookup_succeeded';
export const fetch_lookup_failed = 'fetch_lookup_failed';
export const create_employee_started = 'create_employee_started';
export const create_employee_succeeded = 'create_employee_succeeded';
export const create_employee_failed = 'create_employee_failed';

const fetchLookupStart = () => {
  return {
    type: fetch_lookup_started,
  };
};

const fetchLookupSuccess = (data) => ({
  type: fetch_lookup_succeeded,
  payload: {
    data,
  },
});

const fetchLookupFailed = () => {
  return {
    type: fetch_lookup_failed,
  };
};

const createEmployeeStart = () => {
  return {
    type: create_employee_started,
  };
};

const createEmployeeSuccess = (data) => ({
  type: create_employee_succeeded,
  payload: {
    data,
  },
});

const createEmployeeFailed = () => {
  return {
    type: create_employee_failed,
  };
};

async function getPosts() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts/');
  return response.json();
}

export const getLookup = () => {
  return async (dispatch) => {
    dispatch(fetchLookupStart());
    let roles = LookupData.Roles;
    let currency = LookupData.Currency;
    getPosts()
      .then((data) => {
        let lookups = {
          Roles: roles,
          Posts: data,
          Currency: currency,
        };
        dispatch(fetchLookupSuccess(lookups));
      })
      .catch((error) => {
        dispatch(fetchLookupFailed());
      });
  };
};

async function addEmployee(employee: IEmployee) {
  var request = {
    name: employee.FirstName + ' , ' + employee.LastName,
    salary: employee.Salary,
    age: employee.Age,
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  };
  const response = await fetch('https://reqres.in/api/posts', requestOptions);
  return response.json();
}

export const createEmployee = (employee: IEmployee) => {
  return async (dispatch) => {
    dispatch(createEmployeeStart());
    addEmployee(employee)
      .then((data) => {
        employee.EmployeeId = data.id;
        dispatch(createEmployeeSuccess(employee));
      })
      .catch((error) => {
        dispatch(createEmployeeFailed());
      });
  };
};
