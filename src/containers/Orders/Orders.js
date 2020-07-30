import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as orderAction from "../../store/action/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.props.onFetchingOrder(this.props.token,this.props.userId);
  }
  render() {
    let order = <Spinner />;
    // console.log(this.props.loading);
    // console.log(this.props.orders);
    
    if (!this.props.loading) {
      // console.log(this.props.orders);
      order = this.props.orders.map((order) => {
        const key = order.id;
        // console.log(key);
        if(!key)
          return null;
        return <Order
          key={key}
          price={order.price}
          ingredients={order.ingredients}
        />
      });
    }
    return <div style={{ marginTop: "100px" }}>{order}</div>;
  }
}

const mapStateFromProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token : state.auth.token,
    userId : state.auth.userId,
  };
};
const mapDispatchFromProps = (dispatch) => {
  return {
    onFetchingOrder: (token,userId) => dispatch(orderAction.fetchOrders(token,userId)),
  };
};
export default connect(
  mapStateFromProps,
  mapDispatchFromProps
)(withErrorHandler(Orders, axios));
