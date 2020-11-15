import React from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

export default class BaseMap extends React.Component {
  render() {
    let styles = {
      display: this.props.active === 'profile' ? 'block' : 'none'
    };
    return (
      <div style={styles}>
        <div style={{ textAlign: 'center' }}>
          <h1>
            <span className="strokeme">Ilmoitetut viat</span>
          </h1>
        </div>
        {this.props.rows.map((row) => (
          <Grid key={row.id} className="profile-view-container" container>
            <Grid className="profile-text" item xs={6}>
              <div>
                <p>{row.category}</p>
                <p>{row.desc}</p>
                <p>{moment(row.createdAt).utc().format('DD.MM.YYYY HH:mm')}</p>
                <p>{row.location}</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <img
                className="profile-img"
                src={`${process.env.REACT_APP_API_URL}/image/${row.imgName}`}
                alt="käyttäjän kuva"
              />
            </Grid>
            <Grid style={{ textAlign: 'center' }} item xs={12}>
              <iframe
                width="600"
                height="450"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=<API_KEY_HERE>&q=${row.location}`}
                allowFullScreen
              />
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
}

//?q='+YOUR_LAT+','+YOUR_LON
