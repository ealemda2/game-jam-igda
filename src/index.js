import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Scene from "./Scene";
import Landing from "./Components/Landing";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <Router>
        <div id="main">
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Redirect exact from="/" to="/landing" />
            <Route path="/landing" component={Landing} />
            <Route path="/game" component={Scene} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function About() {
  const styles = {
    display: "flex",
    position: "absolute",
    fontSize: "30pt",
    top: "10vh",
    left: "35vw",
    fontFamily: "Bungee Inline",
  };
  return (
    <a href="https://calemdar.github.io/" style={styles}>
      Made by Cem & Ert - 2020
    </a>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
