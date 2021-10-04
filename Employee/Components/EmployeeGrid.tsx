import * as React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { IEmployee, ISalary } from '../../Employee/Employee';
import { MessageType, formatCurrency } from '../../Common/Common';

const ResultRow = (props) => {
  let { item } = props;

  return (
    <tr>
      <td>{item.FirstName}</td>
      <td>{item.LastName}</td>
      <td>{item.RoleName}</td>
      <td>{item.Age}</td>
      <td>{formatCurrency(item.Salary.Amount, item.Salary.Currency)}</td>
    </tr>
  );
};

class EmployeeDisplay extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Age</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {this.props.employees.map((elem, index) => {
            return <ResultRow item={elem} key={index} />;
          })}
        </tbody>
      </table>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    employees: state.employee.Employees,
  };
};

export default connect(mapStateToProps, null)(EmployeeDisplay);
