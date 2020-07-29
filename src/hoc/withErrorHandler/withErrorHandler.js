import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };
    constructor(props) {
      super(props);
      this.errorHandler();
    }
    errorHandler = () => {
      this.reqIntercepter = axios.interceptors.request.use((req) => {
        // console.log("witherror intercepter req")
        return req;
      });
      this.resIntercepter = axios.interceptors.response.use(
        (res) => res,
        (err) => this.errHandle(err)
      );
    };
    errHandle = (err) => {
      this.setState({ error: err });
      return Promise.reject("AAA");
      // console.log("ERR",err);
    };
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercepter);
      axios.interceptors.response.eject(this.resIntercepter);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      // console.log("witherrorhandlers render");
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            error={"Yes"}
            modalClosed={this.errorConfirmedHandler}
          >
            <p>some error occured</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
