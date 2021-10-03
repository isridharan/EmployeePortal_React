import * as React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import _ from 'underscore';
import { getLookup, createEmployee } from '../action';
import { IEmployee } from '../Employee';
import { MessageType, checkForAlphabets } from '../../Common/Common';

export interface IEmployeeCreateState extends IEmployee {
  errors: { message: string; type: MessageType }[];
  isProcessing: boolean;
}

const initialState = {
  EmployeeId: 0,
  FirstName: '',
  LastName: '',
  Role: '',
  RoleName: '',
  Age: 0,
  Salary: { Amount: 0, Currency: '', CurrencyName: '' },
  errors: [],
  isProcessing: false,
};

class EmployeeCreate extends React.Component<any, IEmployeeCreateState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    if (_.isEmpty(this.props.lookups)) {
      this.props.loadlookups();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEmployeeCreationCompleted === true) {
      this.resetForm();
    }
  }

  componentDidUpdate() {}

  IsValid = function () {
    return (
      this.state.FirstName !== '' &&
      this.state.LastName !== '' &&
      this.state.Role !== '' &&
      this.state.Age !== 0 &&
      this.state.Age >= 15 &&
      this.state.Age <= 80 &&
      this.state.Salary.Amount !== 0 &&
      this.state.Salary.Currency !== ''
    );
  };

  resetForm() {
    this.setState({ ...initialState });
  }

  handleChange(name: string, value: any) {
    switch (name) {
      case 'FirstName':
        if (checkForAlphabets(value) || value === '') {
          this.setState({
            FirstName: value,
          });
        }
        break;
      case 'LastName':
        if (checkForAlphabets(value) || value === '') {
          this.setState({
            LastName: value,
          });
        }
        break;
      case 'Role':
        var role = _.findWhere(this.props.lookups.Roles, {
          Value: value,
        });
        this.setState({
          Role: value,
        });
        this.setState({
          RoleName: role.Text,
        });
        break;
      case 'Age':
        if (value === '') {
          this.setState({
            Age: 0,
          });
        } else {
          var age = parseInt(value);
          this.setState({
            Age: age,
          });
        }
        break;
      case 'Salary':
        if (value === '') {
          this.setState((state) => ({
            Salary: {
              ...state.Salary,
              Amount: 0,
            },
          }));
        } else {
          this.setState((state) => ({
            Salary: {
              ...state.Salary,
              Amount: value,
            },
          }));
        }
        break;
      case 'Currency':
        var currency = _.findWhere(this.props.lookups.Currency, {
          Value: value,
        });
        this.setState((state) => ({
          Salary: {
            ...state.Salary,
            Currency: value,
          },
        }));
        this.setState((state) => ({
          Salary: {
            ...state.Salary,
            CurrencyName: currency.Text,
          },
        }));
        break;
      default:
        break;
    }
  }
  handleSave() {
    var employee = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Age: this.state.Age,
      Role: this.state.Role,
      RoleName: this.state.RoleName,
      Salary: this.state.Salary,
    };
    this.props.createEmployee(employee);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <span className="col-sm-2"> FirstName </span>
          <div className="col-sm-4">
            <input
              onChange={(e) => this.handleChange('FirstName', e.target.value)}
              type="text"
              name="FirstName"
              value={this.state.FirstName}
            />
          </div>
          {this.state.FirstName === '' && (
            <div className="col-md-2">
              <span className="label label-required">Required</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <span className="col-sm-2"> LastName </span>
          <div className="col-sm-4">
            <input
              onChange={(e) => this.handleChange('LastName', e.target.value)}
              type="text"
              name="LastName"
              value={this.state.LastName}
            />
          </div>
          {this.state.LastName === '' && (
            <div className="col-md-2">
              <span className="label label-required">Required</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <span className="col-sm-2">Role</span>
          <div className="col-sm-2">
            <select
              value={this.state.Role}
              name="Role"
              onChange={(e) => this.handleChange('Role', e.target.value)}
            >
              {this.props.lookups.Roles &&
                this.props.lookups.Roles.map((elem) => {
                  return (
                    <option key={elem.Value} value={elem.Value}>
                      {elem.Text}
                    </option>
                  );
                })}
            </select>
          </div>
          {this.state.Role === '' && (
            <div className="col-md-2">
              <span className="label label-required">Required</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <span className="col-sm-2"> Age </span>
          <div className="col-sm-4">
            <input
              onChange={(e) =>
                this.handleChange.bind(this)('Age', e.target.value)
              }
              type="number"
              name="Age"
              value={this.state.Age}
            />
          </div>
          {this.state.Age == 0 && (
            <div className="col-md-2">
              <span className="label label-required">Required</span>
            </div>
          )}
          <div className="col-md-12 small text-info">
            <i>Age between (15-80 Years)</i>
          </div>
        </div>
        <div className="form-group">
          <span className="col-sm-2"> Salary </span>
          <div className="col-sm-6">
            <input
              onChange={(e) => this.handleChange('Salary', e.target.value)}
              type="number"
              name="Salary"
              value={this.state.Salary.Amount}
            />
          </div>
          {this.state.Salary.Amount == 0 && (
            <div className="col-md-2">
              <span className="label label-required">Required</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <span className="col-sm-2"> Currency </span>
          <div className="col-sm-6">
            <select
              value={this.state.Salary.Currency}
              name="Currency"
              onChange={(e) => this.handleChange('Currency', e.target.value)}
            >
              {this.props.lookups.Currency &&
                this.props.lookups.Currency.map((elem) => {
                  return (
                    <option key={elem.Value} value={elem.Value}>
                      {elem.Text}
                    </option>
                  );
                })}
            </select>
          </div>
          {this.state.Salary.Currency === '' && (
            <div className="col-md-2">
              <span className="label label-required">Required</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="col-sm-2">
            <button
              disabled={!this.IsValid()}
              className="btn btn-success"
              type="button"
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
          {!this.IsValid() && (
            <div className="col-md-12 small text-danger">
              <i>
                Note: Please make sure all the form fields are valid for Save
                button to be enabled
              </i>
            </div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    lookups: state.employee.Lookups,
    isEmployeeCreationCompleted: state.employee.IsEmployeeCreationSuccessful,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    loadlookups: () => dispatch(getLookup()),
    createEmployee: (employee) => dispatch(createEmployee(employee)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
