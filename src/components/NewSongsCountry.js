import React, { Component } from "react";
import { SongData } from "./Data/SongData";

class NewSongsCountry extends Component {
  render() {
    const tracks = SongData;
    const countryTracks = [];
    tracks.map((item, index) => {
      if (this.props.country === "0") {
        countryTracks.push(item);
      } else {
        if (this.props.country === "1") {
          item.country.map((child) => {
            if (child.id === this.props.country) {
              countryTracks.push(item);
            }
          });
        } else {
          item.country.map((child) => {
            if (child.id !== "1") {
              countryTracks.push(item);
            }
          });
        }
      }
    });
    return (
      <div>
        {countryTracks.map((item, index) => (
          <div>{item.title}</div>
        ))}
      </div>
    );
  }
}

export default NewSongsCountry;
