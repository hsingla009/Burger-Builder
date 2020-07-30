import React, { Component } from "react";

import "./App.css";

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Checkout from "../src/containers/Checkout/Checkout";

import { Route, withRouter, Switch, Redirect } from "react-router-dom";
// import Order from "./components/Order/Order";
import Orders from "./containers/Orders/Orders";

import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

import * as action from "./store/action/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    let route = (
      <Switch>
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );
    if (!this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{route}</Layout>;
  }
}
const mapStateFromProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchFromProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(action.authCheckState()),
  };
};
export default withRouter(
  connect(mapStateFromProps, mapDispatchFromProps)(App)
);
