import React, { Component } from "react";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div class="menu" onClick={() => this.onClickOpen()}></div>;
  }

  renderMenuItems = () => {};

  onClickOpen = (prevState) => {
    this.setState({ isOpen: !prevState.isOpen });
  };
}

export default Landing;
