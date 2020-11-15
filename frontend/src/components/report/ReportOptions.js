import React from "react";
import FormatFileSize from "../../functions/FormatFileSize";
// Material-UI Components
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
// Axios
import Axios from "axios";

export default class ReportOptions extends React.Component {
  state = {
    filetype: "general",
    upload: 0,
    speed: 0,
    oldTime: 0,
    oldLoad: 0,
    description: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpload = _ => {
    const formData = new FormData();
    formData.append("file", this.props.file);
    formData.append("location", this.props.gps);
    formData.append("category", this.state.filetype);
    formData.append("description", this.state.description);
    this.setState({ uploading: true });
    Axios.request({
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: `${process.env.REACT_APP_API_URL}/images/upload/`,
      data: formData,
      onUploadProgress: p => {
        let speed =
          ((p.loaded - this.state.oldLoad) * 1000) /
          (p.timeStamp - this.state.oldTime);
        this.setState({
          upload: Math.floor((p.loaded * 100) / p.total),
          speed: speed,
          oldTime: p.timeStamp,
          oldLoad: p.loaded
        });
      }
    })
      .then(res => {
        this.setState({ uploading: false });
        if (res.status === 201) {
          this.props.popup("Kiitos ilmoituksestasi!", "success");
          this.props.update();
        } else this.props.popup(res.data.message, "error");
        this.props.clearUpload();
      })
      .catch(error => {
        this.props.popup(error.message, "error");
      });
  };

  selectStyle = {
    position: "relative",
    backgroundColor: "#3f51b5",
    fontSize: 16,
    padding: "10px 26px 10px 12px"
  };
  render() {
    return (
      <div>
        <Grid className="upload-options-container" container>
          <Grid item xs={12}>
            <img
              className="preview-img"
              src={URL.createObjectURL(this.props.file)}
              alt="preview"
            />
          </Grid>
        </Grid>
        {!this.state.uploading && (
          <Grid className="upload-options-container" container>
            <Grid item xs={12}>
              <InputLabel
                style={{ color: "#E74C3C", fontSize: "150%" }}
                htmlFor="filetypeSelect"
              >
                Ilmoituksen tyyppi:
              </InputLabel>
              <RadioGroup
                value={this.state.filetype}
                onChange={this.handleChange}
                name="filetype"
                id="upload-radio-group"
              >
                <FormControlLabel
                  value="general"
                  control={<Radio />}
                  label="Yleinen"
                  id="upload-label-general"
                  color="secondary"
                />
                <FormControlLabel
                  value="alva"
                  control={<Radio />}
                  label="Alva"
                  id="upload-label-alva"
                />
                <FormControlLabel
                  value="kunta"
                  control={<Radio />}
                  label="Kunta"
                  id="upload-label-kunta"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ margin: "20px 0px" }}
                className="description-box"
                multiline
                rows="8"
                variant="filled"
                placeholder="Kuvaus tapahtumasta"
                size="medium"
                id="description-box"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
        )}
        {this.state.uploading && (
          <Grid className="upload-options-container" container>
            <Grid item xs={12}>
              <h2>
                {this.props.file.name} {FormatFileSize(this.props.file.size, 0)}
              </h2>
            </Grid>
            <Grid item xs={10}>
              <LinearProgress
                className="upload-progress"
                variant="determinate"
                value={this.state.upload}
              />
            </Grid>
            <Grid item xs={3}>
              {`${this.state.upload} %`}
            </Grid>
            <Grid item xs={3}>
              {`${FormatFileSize(this.state.speed, 0)}/s`}
            </Grid>
          </Grid>
        )}
        <Grid className="upload-options-container" container>
          <Grid className="mobile-hack" item xs={3}>
            <Button
              onClick={this.props.clearUpload}
              variant="contained"
              id="cancelUploadButton"
              color="primary"
              className="org-button"
            >
              Peruuta
            </Button>
          </Grid>
          <Grid className="mobile-hack" item xs={3}>
            <Button
              onClick={this.handleUpload}
              variant="contained"
              id="submitUploadButton"
              className="org-button"
              color="primary"
            >
              Lähetä
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
