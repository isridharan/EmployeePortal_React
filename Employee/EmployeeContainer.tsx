import * as React from 'react';
import EmployeeDisplay from '../Employee/Components/EmployeeGrid';
import EmployeeCreate from './Components/EmployeeCreate';
import EmployeeDashboard from './Components/EmployeeCounter';
import Loader from '../Employee/Components/Loader';

export default (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <h2> Employee Portal </h2>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Loader />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <EmployeeCreate />
        </div>
        <div className="col-sm-4">
          <EmployeeDashboard />
        </div>
      </div>
      <div className="row">
        <EmployeeDisplay />
      </div>
    </div>
  );
};
