import React, { Component } from "react";

import "./App.css";

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Checkout from "../src/containers/Checkout/Checkout"

import {Route} from "react-router-dom";
// import Order from "./components/Order/Order";
import Orders from "./containers/Orders/Orders";

import Auth from "./containers/Auth/Auth"
class App extends Component {
  render() {
    return (
      <Layout>
        <Route path ="/" exact component ={BurgerBuilder} />
        <Route path = "/orders" component = {Orders} />
        <Route path = "/checkout"  component={(Checkout)} />
        <Route path = "/auth" component = {Auth}/>
      </Layout>
    );
  }
}

export default App;
