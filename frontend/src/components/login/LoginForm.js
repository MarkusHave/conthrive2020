import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  // Changes state value
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = _ => {
    // settings for fetch
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password
      })
    };
    fetch(`${process.env.REACT_APP_API_URL}/user/login`, init)
      .then(async res => {
        if (res.ok) return res.json();
        throw await res.json();
      })
      .then(res => {
        this.props.handleLogin(res);
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  disableButton = _ => {
    // disable button if an input field is empty
    // disable button if an input field has incorrect length
    if (
      this.state.username.length < 3 ||
      this.state.password.length < 3 ||
      this.state.username.length > 15 ||
      this.state.password.length > 255
    )
      return true;
    return false;
  };

  render() {
    let juu = {
      display: this.props.active === "login" ? "block" : "none"
    };
    return (
      <form style={juu} className="loginForm">
        <h1>Kirjautuminen</h1>
        <TextField
          required
          id="loginUsernameInput"
          placeholder="käyttäjä"
          margin="normal"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          autoFocus
        />
        <br />
        <TextField
          id="loginPasswordInput"
          type="password"
          placeholder="salasana"
          margin="normal"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <Button
          onClick={this.handleLogin}
          disabled={this.disableButton()}
          variant="contained"
          id="loginSubmitButton"
          color="primary"
        >
          Login
        </Button>
        <br />
        <h3 id="loginErrorMessage">{this.state.error}</h3>
      </form>
    );
  }
}
