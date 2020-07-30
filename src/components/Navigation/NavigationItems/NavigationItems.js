import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger</NavigationItem>
      {props.isAuth ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuth ? (
        <NavigationItem link="/logout">Log Out</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
