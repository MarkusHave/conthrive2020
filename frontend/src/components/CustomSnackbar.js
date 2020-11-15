import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { amber, green, red, blue } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

export default class CustomSnackbar extends React.Component {
  variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  };

  snackbarStyles = {
    success: { backgroundColor: green[600], minWidth: "200px" },
    warning: { backgroundColor: amber[700], minWidth: "200px" },
    error: { backgroundColor: red[600], minWidth: "200px" },
    info: { backgroundColor: blue[600], minWidth: "200px" }
  };

  spanStyle = {
    display: "flex",
    textAlign: "center",
    fontSize: 28
  };

  iconStyle = {
    marginRight: "10px"
  };

  render() {
    let Icon = this.variantIcon[this.props.snackbar.variant];
    return (
      <Snackbar
        open={this.props.open}
        autoHideDuration={this.props.snackbar.autoHideDuration}
        anchorOrigin={this.props.snackbar.anchorOrigin}
        onClose={this.props.handleSnackbarClose}
      >
        <SnackbarContent
          style={this.snackbarStyles[this.props.snackbar.variant]}
          message={
            <span style={this.spanStyle} id="snackbar-popup">
              <Icon style={this.iconStyle} />
              {this.props.snackbar.message}
            </span>
          }
        />
      </Snackbar>
    );
  }
}
