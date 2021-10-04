import * as React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

class Loader extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.isLoading && <span>Loading........</span>}</div>;
  }
}
let mapStateToProps = (state) => {
  return {
    isLoading: state.employee.IsLoading,
  };
};

export default connect(mapStateToProps, null)(Loader);
