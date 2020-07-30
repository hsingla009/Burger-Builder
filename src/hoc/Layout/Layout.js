import React from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  SideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxiliary>
        <div>
          <Toolbar
            toggleSideDrawer={this.SideDrawerToggleHandler}
            isAuth={this.props.isAuth}
          />
          <SideDrawer
            showSideDrawer={this.state.showSideDrawer}
            isAuth={this.props.isAuth}
            closeSideDrawer={this.SideDrawerClosedHandler}
          />
        </div>
        <main>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
