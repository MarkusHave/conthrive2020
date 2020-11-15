import React from "react";
// Material-UI Components
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// Icons
import CloudUpload from "@material-ui/icons/CloudUpload";
import ReportOptions from "./ReportOptions";

import CustomSnackbar from "../CustomSnackbar";
import EXIF from "exif-js";
import Coordinate from "coordinates-conversion";

export default class ReportForm extends React.Component {
  state = {
    files: null,
    hightlight: false,
    gps: null,
    snackbar: {
      autoHideDuration: 10000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      message: "",
      variant: "info"
    }
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

  handleFilecheck = file => {
    if (file.size > 50000000) {
      this.createNewSnackbar("Tiedostokoko liian suuri. Maksimi 50Mt", "error");
    } else if (!file.name.match(/\.(jpg|jpeg)$/)) {
      this.createNewSnackbar(
        "Tuntematon tiedostotyyppi. Tuetaan jpg ja jpeg",
        "error"
      );
    } else {
      EXIF.getData(file, function() {
        var nicehack = document.getElementById("puukkoa");
        try {
          nicehack.innerHTML = `
          ${EXIF.getTag(this, "GPSLatitude").join(" ")} ${EXIF.getTag(
            this,
            "GPSLatitudeRef"
          )} ${EXIF.getTag(this, "GPSLongitude").join(" ")} ${EXIF.getTag(
            this,
            "GPSLongitudeRef"
          )}`;
        } catch {
          nicehack.innerHTML = "none";
        }
      });
      setTimeout(
        function() {
          this.handleUserCords(file);
        }.bind(this),
        1000
      );
    }
  };

  handleUserCords = file => {
    var nicehack = document.getElementById("puukkoa");
    var data = nicehack.innerHTML;
    if (data !== "none") {
      var cord = new Coordinate(data);
      var parsed = cord.toDd(",");
      console.log(parsed);
      this.setState({ files: file, hightlight: false, gps: parsed });
    } else {
      this.createNewSnackbar("Kuvassa ei EXIF-dataa", "info");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            files: file,
            hightlight: false
          });
          this.createNewSnackbar("GPS lisätty onnistuneesti", "success");
        }, this.gpsError);
      } else {
        this.createNewSnackbar("GPSää ei onnistuttu lisäämään", "error");
      }
    }
    nicehack.innerHTML = "";
  };

  gpsError = positionError => {
    this.createNewSnackbar(positionError.message, "error");
  };

  handleDragOver = e => {
    e.preventDefault();
    this.setState({ hightlight: true });
  };

  handleDragLeave = _ => {
    this.setState({ hightlight: false });
  };

  handleOnDrop = e => {
    e.preventDefault();
    this.handleFilecheck(e.dataTransfer.files[0]);
  };

  handleManualUpload = e => {
    e.preventDefault();
    this.handleFilecheck(e.target.files[0]);
  };

  handleUploadCancel = _ => {
    this.setState({ files: null });
  };

  render() {
    let filezoneStyle = {
      display: this.props.active === "upload" ? "block" : "none",
      position: "absolute",
      inset: "72px 0px 0px",
      padding: this.state.files ? "20px 0px" : "0"
    };
    return (
      <div style={filezoneStyle}>
        {!this.state.files && (
          <Grid className="upload-container" container>
            <div
              className={`drop-zone ${
                this.state.hightlight ? "highlight" : ""
              }`}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onDrop={this.handleOnDrop}
            >
              <div>
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={this.handleManualUpload}
                />
                <label htmlFor="file-input">
                  <CloudUpload
                    id="manual-file-upload-icon"
                    style={{ fontSize: "96px" }}
                  />
                </label>
                <br />
                <i> Siirrä kuvia tähän...</i>
                <br />
                <label htmlFor="file-input">
                  <Button id="manual-file-upload-button" component="span">
                    Tai valitse kuva laitteeltasi
                  </Button>
                </label>
              </div>
            </div>
          </Grid>
        )}
        {this.state.files && (
          <ReportOptions
            file={this.state.files}
            popup={this.createNewSnackbar}
            clearUpload={this.handleUploadCancel}
            gps={this.state.gps}
            update={this.props.update}
          />
        )}
        <CustomSnackbar
          snackbar={this.state.snackbar}
          open={this.state.open}
          handleSnackbarClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}
