// JS
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
// CSS
import "./App.css";
import "typeface-roboto";
// Login & MainMenu Components
import LoginForm from "./components/login/LoginForm";
import MainMenu from "./MainMenu";

export default class App extends React.Component {
  state = {
    logged: true,
    authFinished: true
  };

  handleLogout = _ => {
    localStorage.setItem("name", "");
    localStorage.setItem("token", "");
    this.setState({ logged: false });
  };

  loginForm = _ => <LoginForm handleLogin={this.handleLogin} />;
  mainMenu = _ => (
    <MainMenu handleLogout={this.handleLogout} logged={this.state.logged} />
  );

  render() {
    if (!this.state.authFinished)
      return (
        <div className="loading">
          <CircularProgress size={200} />
        </div>
      );
    return (
      <Router>
        {!this.state.logged && (
          <Switch>
            <Route path="/login" component={this.loginForm} />
            <Route path="/" component={this.mainMenu} />
            <Redirect from="*" to="/" />
          </Switch>
        )}
        {this.state.logged && (
          <Switch>
            <Route exact path="/" component={this.mainMenu} />
            <Redirect from="*" to="/" />
          </Switch>
        )}
      </Router>
    );
  }
}
