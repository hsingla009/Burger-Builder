import React from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
  state = {
    showSideDrawer : false
  }
  SideDrawerClosedHandler =()=>{
    this.setState({showSideDrawer:false})
  }
  SideDrawerToggleHandler =()=>{
    this.setState((prevState) =>{
      return {showSideDrawer:!prevState.showSideDrawer};
  })
  }
  render() {
    return (
      <Auxiliary>
        <div>
          <Toolbar toggleSideDrawer = {this.SideDrawerToggleHandler} />
          <SideDrawer showSideDrawer={this.state.showSideDrawer} closeSideDrawer = {this.SideDrawerClosedHandler} />
        </div>
        <main>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
