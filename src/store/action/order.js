import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: orderData,
    id: orderId,
  };
};
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASED_INIT,
  };
};
export const purchaseBurger = (orderData,token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};
export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error,
  };
};
export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};
export const fetchOrders = (token,userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json?auth=" + token)
      .then((res) => {
        // console.log(res.data);
        const fetchedOrder = [];
        for (let key in res.data) {
          // console.log(key);
          fetchedOrder.push({
            ...res.data[key],
            id: key,
          });
        }
        const updatedFetched = fetchedOrder.filter(p=>p.userId ===userId );
        // console.log(updatedFetched);

        dispatch(fetchOrderSuccess(updatedFetched));
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
      });
  };
};
