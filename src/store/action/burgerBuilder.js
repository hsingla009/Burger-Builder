import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};
export const purchasingDisable = () => {
  return {
    type: actionTypes.PURCHASING_DISABLE,
  };
};
export const purchasing = () => {
  return {
    type: actionTypes.PURCHASED_INIT,
  };
};
export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};
export const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings,
  };
};
export const fetchIngredientsHandler = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsHandler());
      });
  };
};
