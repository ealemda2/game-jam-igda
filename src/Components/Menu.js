import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return <div class="menu" onClick={() => this.onClickOpen()}></div>;
  }

  renderMenuItems = () => {};

  onClickOpen = (prevState) => {
    this.setState({ isOpen: !prevState.isOpen });
  };
}

export default Menu;
