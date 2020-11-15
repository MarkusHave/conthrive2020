import React from "react";
import Button from "@material-ui/core/Button";

export default class InfoPage extends React.Component {
  state = {};

  render() {
    let filezoneStyle = {
      display: this.props.active === "info" ? "block" : "none",
      textAlign: "center"
    };
    return (
      <div style={filezoneStyle} className="info">
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="jumbotron">
                <h1 className="small">
                  <span className="strokeme">Havaitse, kuvaa ja ilmoita</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="cta-1">
          <div className="container">
            <div className="row text-center grey">
              <p className="cta-sub-title">
                Hajonnut katuvalo, tukossa oleva viemäri, epäkunnossa oleva liikennevalo tai vaikka kuoppa tiessä.
                Ilmoita havaitsemistasi virheistä, ota vain kuva sekä lisää kommentti ja asia välitetään oikealle taholle.
                Apusi on korvaamatonta!
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => this.props.handleTabChange(this, "upload")}
          variant="contained"
          id="ilmoitaButton"
          color="primary"
          value="upload"
        >
          Ilmoita
        </Button>
      </div>
    );
  }
}
