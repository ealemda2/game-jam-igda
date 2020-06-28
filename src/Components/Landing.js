import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";

import "../landing.css";
import "antd/dist/antd.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.location.pathname === "/landing",
    };
  }

  render() {
    return this.renderLandingNav();
  }

  renderLandingNav = () => {
    const buttonStyle = {
      width: "250px",
      height: "100px",
      fontSize: "16pt",
    };
    return (
      <div id="landing-nav">
        <Row>
          <Button
            style={{ ...buttonStyle, backgroundColor: "#621bc4" }}
            type="primary"
          >
            <Link to="/game">Play Hat Trick!</Link>
          </Button>
        </Row>
        <Row>
          <Button style={buttonStyle} type="secondary">
            <Link to="/about">About</Link>
          </Button>
        </Row>
      </div>
    );
  };

  renderGameNav = () => {
    const { isOpen } = this.props;
    if (isOpen) {
      return (
        <div id="game-nav">
          <nav>
            <ul>
              <li>
                <Link to="/game">Game</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            {this.renderHamburger()}
          </nav>
        </div>
      );
    }
    return this.renderHamburger();
  };

  renderHamburger = () => {
    const { isOpen } = this.props;

    return isOpen ? (
      <UpCircleOutlined onClick={this.onClickOpen} />
    ) : (
      <DownCircleOutlined onClick={this.onClickOpen} />
    );
  };

  onClickOpen = (prevState) => {
    this.setState({ isOpen: !prevState.isOpen });
  };
}

export default Landing;
