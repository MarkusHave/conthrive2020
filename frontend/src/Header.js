import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import HelpIcon from "@material-ui/icons/Help";

export default class Header extends React.Component {
  render() {
    return (
      <Paper square>
        <Tabs
          className="header"
          value={this.props.active}
          onChange={this.props.handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab
            id="show InfoTab"
            value="info"
            icon={<HelpIcon />}
            label="INFO"
          />
          <Tab
            id="show UploadTab"
            value="upload"
            icon={<GpsFixedIcon />}
            label="ILMOITA"
          />
          {this.props.logged && (
            <Tab
              id="showProfileTab"
              value="profile"
              icon={<Person />}
              label="PROFILE"
            />
          )}
          {this.props.logged && (
            <Tab
              id="logoutButton"
              value="logout"
              icon={<ExitToApp />}
              label="LOGOUT"
            />
          )}
          {!this.props.logged && (
            <Tab
              id="loginButton"
              value="login"
              icon={<ExitToApp />}
              label="LOGIN"
            />
          )}
        </Tabs>
      </Paper>
    );
  }
}
