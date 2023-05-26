import React, { useState, useEffect } from "react";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import TrackItem from "./Item/TrackItem";
import { SongData } from "./Data/SongData";
import "../styles/NewSongs.css";

function NewSongs() {
  const [toggleState, setToggleState] = useState(1);
  const tracksByCountry = [];
  SongData.map((item, index) => {
    if (toggleState === 1) {
      tracksByCountry.push(item);
    } else if (toggleState === 2) {
      item.country.map((child) => {
        if (child.id === "1") {
          tracksByCountry.push(item);
        }
      });
    } else if (toggleState === 3) {
      item.country.map((child) => {
        if (child.id === "3" || child.id === "4") {
          tracksByCountry.push(item);
        }
      });
    } else {
      item.country.map((child) => {
        if (child.id !== "1" && child.id !== "3" && child.id !== "4") {
          tracksByCountry.push(item);
        }
      });
    }
  });
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const tracks = tracksByCountry;
  const song = useContext(MusicPlayerContext);

  return (
    <div className="listSongContainer">
      <div className="listSongHeader">
        <button
          className={toggleState === 1 ? "nation active" : "nation"}
          onClick={() => toggleTab(1)}
        >
          Tất cả
        </button>
        <button
          className={toggleState === 2 ? "nation active" : "nation"}
          onClick={() => toggleTab(2)}
        >
          Việt Nam
        </button>
        <button
          className={toggleState === 3 ? "nation active" : "nation"}
          onClick={() => toggleTab(3)}
        >
          US-UK
        </button>
        <button
          className={toggleState === 4 ? "nation active" : "nation"}
          onClick={() => toggleTab(4)}
        >
          Khác
        </button>
      </div>
      <div className="listSongBody">
        {tracksByCountry.map(
          (item, key) =>
            key < 9 && (
              <div className="song">
                <TrackItem
                  key={key}
                  item={item}
                  tracks={tracks}
                  song={song}
                  index={key}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default NewSongs;
