// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import Scene from "./Scene";
// import * as serviceWorker from "./serviceWorker";

// const App = () => (
//   <div>
//     <Scene />
//   </div>
// );

// ReactDOM.render(
//     <App />,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

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
  return <h1>About</h1>;
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
