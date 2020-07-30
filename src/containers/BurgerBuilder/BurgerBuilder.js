import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/action/index";
import { connect } from "react-redux";

class BurgerBuilder extends React.Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    if (!this.props.isBuilding || this.props.purchased) {
      this.props.onPurchasingDisable();

      this.props.onInitIngrdient();
    }
  }
  updatePurchaseStatus(ingredients) {
    // console.log("R", ingredients);
    let ingredientSum = 0;
    for (let key in ingredients) {
      ingredientSum += ingredients[key];
    }
    return ingredientSum > 0;
  }
  purchaseHandler = () => {
    this.props.onPurchasing();
    if (!this.props.isAuth) {
      this.props.history.push({
        pathname: "/auth",
      });
    }
  };

  purchaseCancelHandler = () => {
    this.props.onPurchasingDisable();
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();

    this.props.history.push({
      pathname: "/checkout",
    });
  };
  render() {
    // console.log("BurgerBuilder render");
    const disabledInfo = { ...this.props.ings };
    for (let i in disabledInfo) {
      disabledInfo[i] = disabledInfo[i] <= 0;
    }
    // console.log(disabledInfo)
    let burgerComponent = <Spinner />;
    let orderSummary = null;
    if (this.props.error) {
      burgerComponent = <p style={{ marginTop: "80px" }}>can't load page</p>;
    }
    if (this.props.ings) {
      burgerComponent = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseStatus(this.props.ings)}
            clicked={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Auxiliary>
        <Modal
          show={this.props.purchasing}
          modalClosed={this.purchaseCancelHandler}
          error={"No"}
        >
          {orderSummary}
        </Modal>
        {burgerComponent}
      </Auxiliary>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuth: state.auth.token !== null,
    isBuilding: state.burgerBuilder.isBuilding,
    purchasing: state.burgerBuilder.purchasing,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(action.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(action.removeIngredient(ingName)),
    onInitIngrdient: () => dispatch(action.initIngredients()),
    onPurchaseInit: () => dispatch(action.purchaseInit()),
    onPurchasing: () => dispatch(action.purchasing()),
    onPurchasingDisable: () => dispatch(action.purchasingDisable()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
