import React from "react";
import * as action from "../../../store/action/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchFromProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.authLogout()),
  };
};

export default connect(null,mapDispatchFromProps)(Logout);