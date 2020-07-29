import React from "react";

import classes from "./SideDrawer.module.css";

import BackDrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const SideDrawer = (props) => {
  const cl = [];
  cl.push(classes.SideDrawer);
  if (props.showSideDrawer) {
    cl.push(classes.Open);
  }
  else{
    cl.push(classes.Close)
  }
  return (
    <Auxiliary>
      <BackDrop show={props.showSideDrawer} clicked={props.closeSideDrawer} />
      <div className={cl.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default SideDrawer;
