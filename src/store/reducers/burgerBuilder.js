import * as actionType from "../action/actionTypes";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  isBuilding: false,
  purchasing: false,
};
const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.6,
  meat: 1.3,
  cheese: 0.4,
};
const reducer = (state = initialState, action) => {
  const updatedState = { ...state };
  const updatedIngredients = { ...state.ingredients };
  let updatedPrice;
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      updatedIngredients[action.ingredientName] =
        state.ingredients[action.ingredientName] + 1;
      updatedState.ingredients = updatedIngredients;
      updatedPrice =
        state.totalPrice + INGREDIENTS_PRICE[action.ingredientName];
      updatedState.totalPrice = updatedPrice;
      updatedState.isBuilding = true;
      return updatedState;

    case actionType.REMOVE_INGREDIENT:
      updatedIngredients[action.ingredientName] =
        state.ingredients[action.ingredientName] - 1;
      updatedState.ingredients = updatedIngredients;
      updatedPrice =
        state.totalPrice - INGREDIENTS_PRICE[action.ingredientName];
      updatedState.totalPrice = updatedPrice;
      return updatedState;
    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        isBuilding: false,
      };
    case actionType.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionType.PURCHASED_INIT:
      return {
        ...state,
        purchasing: true,
      };
      case actionType.PURCHASING_DISABLE:
        return {
          ...state,
          purchasing: false,
        };
    default:
      return state;
  }
};

export default reducer;
