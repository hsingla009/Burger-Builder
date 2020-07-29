import * as actionTypes from "../action/actionTypes";
const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  const newOrder = {
    ...action.orderData,
    orderId: action.orderId,
  };
  switch (action.type) {
    case actionTypes.PURCHASED_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
        purchased: false,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default reducer;
