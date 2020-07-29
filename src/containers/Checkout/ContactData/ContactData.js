import React from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderAction from "../../../store/action/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-order"
class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      ZipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          length: 6,
        },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      delieveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    validForm: false,
  };
  orderHandler = (event) => {
    event.preventDefault();

    // console.log(this.state.loading)
    // console.log(this.props.ingredients);
    let formData = {};
    for (let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }
    // console.log(this.props.ingredients);
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
  };
  checkValidity(value, rules) {
    let valid = false;
    if (rules.required) {
      valid = value.trim() !== "";
    }
    // console.log(valid, value);
    if (rules.length) {
      // console.log(rules.length);
      valid = value.trim().length === rules.length;
    }
    return valid;
  }
  inputChangedHandler = (event, elementIdentifier) => {
    // console.log(event.target.value);
    // console.log(elementIdentifier);
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[elementIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);
    let formValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formValid = updatedOrderForm[inputIdentifier].valid && formValid;
    }
    this.setState({ orderForm: updatedOrderForm, validForm: formValid });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        ...this.state.orderForm[key],
        id: key,
      });
    }

    // console.log(formElementArray);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((f) => (
          <Input
            elementType={f.elementType}
            elementConfig={f.elementConfig}
            value={f.value}
            key={f.id}
            changed={(event) => this.inputChangedHandler(event, f.id)}
          />
        ))}

        <Button
          formValid={!this.state.validForm}
          btnType="Success"
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </form>
    );
    // console.log(this.state.orderForm)
    if (this.props.loading) {
      form = <Spinner />;
    } // console.log("ContactData.js] render");
    // console.log(this.props.loading);
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(orderAction.purchaseBurger(orderData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
