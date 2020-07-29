import React from "react";
import Button from "../../UI/Button/Button";
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ig) => (
    <li key = {ig}>
      {ig} : {props.ingredients[ig]}
      
    </li>
  ));
  // console.log(ingredientSummary);
  // console.log(props.purchaseContinued)
  return (
    <div>
      <strong>Price : {props.price.toFixed(2)}</strong>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients : </p>
      <ul>{ingredientSummary}</ul>
      <Button clicked={props.purchaseContinued} btnType="Success">
        Continue
      </Button>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        Cancel
      </Button>
    </div>
  );
};

export default orderSummary;
