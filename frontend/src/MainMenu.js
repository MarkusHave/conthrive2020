// Libraries
import React from "react";
// Components
import Header from "./Header";
import CustomSnackbar from "./components/CustomSnackbar";
import ReportForm from "./components/report/ReportForm";
import InfoPage from "./components/info/InfoPage";
import LoginForm from "./components/login/LoginForm";
import BaseMap from "./components/profile/BaseMap";

export default class MainMenu extends React.Component {
  state = {
    activeTab: "info",
    snackbar: {
      autoHideDuration: 10000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      message: "",
      variant: "info"
    },
    // should snackbar be visible
    open: false,
    rows: []
  };

  handleTabChange = (e, newTab) => {
    if (newTab === "logout") this.props.handleLogout();
    else this.setState({ activeTab: newTab });
  };

  handleSnackbarClose = _ => {
    this.setState({ open: false });
  };

  createNewSnackbar = (msg, variant) => {
    this.setState(prevState => ({
      snackbar: {
        ...prevState.snackbar,
        message: msg,
        variant: variant
      },
      open: true
    }));
  };

  componentDidMount = _ => {
    this.fetchFiles();
  };

  fetchFiles = _ => {
    fetch(`${process.env.REACT_APP_API_URL}/images/`)
      .then(async res => {
        if (res.ok) return res.json();
        throw await res.json();
      })
      .then(res => {
        this.setState({ rows: res });
      })
      .catch(error => {
        this.createNewSnackbar(error.message, "error");
      });
  };

  render() {
    return (
      <React.Fragment>
        <Header
          active={this.state.activeTab}
          handleLogout={this.props.handleLogout}
          handleTabChange={this.handleTabChange}
          logged={this.props.logged}
        />
        <ReportForm
          active={this.state.activeTab}
          popup={this.createNewSnackbar}
          update={this.fetchFiles}
        />
        <LoginForm
          active={this.state.activeTab}
          popup={this.createNewSnackbar}
        />
        <InfoPage
          handleTabChange={this.handleTabChange}
          active={this.state.activeTab}
        />
        <BaseMap
          handleTabChange={this.handleTabChange}
          popup={this.createNewSnackbar}
          active={this.state.activeTab}
          rows={this.state.rows}
        />
        <CustomSnackbar
          snackbar={this.state.snackbar}
          open={this.state.open}
          handleSnackbarClose={this.handleSnackbarClose}
        />
      </React.Fragment>
    );
  }
}
