import * as React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

class EmployeeDashboard extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>
          Counter &nbsp;
          <span className="badge badge-info badge-pill">
            {this.props.employeeCount}
          </span>
        </h2>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    employeeCount: state.employee.Employees.length,
  };
};

export default connect(mapStateToProps, null)(EmployeeDashboard);
