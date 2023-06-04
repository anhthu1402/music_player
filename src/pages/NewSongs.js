import React, { useContext, useState } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import Track from "../components/Item/TrackItem";
import "../styles/PageNewSongs.css";
import { SongData } from "../components/Data/SongData";
import NotificationContext from "../NotificationContext";

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
  const notification = useContext(NotificationContext);
  return (
    <div className="newSongReleaseContainer">
      <div className="newSongsBtn">
        <button
          className={toggleState === 1 ? "active" : "inactive"}
          onClick={() => toggleTab(1)}
        >
          Tất cả
        </button>
        <button
          className={toggleState === 2 ? "active" : "inactive"}
          onClick={() => toggleTab(2)}
        >
          Việt Nam
        </button>
        <button
          className={toggleState === 3 ? "active" : "inactive"}
          onClick={() => toggleTab(3)}
        >
          US-UK
        </button>
        <button
          className={toggleState === 4 ? "active" : "inactive"}
          onClick={() => toggleTab(4)}
        >
          Khác
        </button>
      </div>
      <div className="newSongsBodyHeading">
        <div>Bài hát</div>
        <div className="releaseDate">Phát hành</div>
        <div>Thời lượng</div>
      </div>
      <div className="newSongsBody">
        {tracksByCountry.map((item, key) => (
          <div className="song shadowDiv">
            <Track
              key={key}
              item={item}
              tracks={tracks}
              song={song}
              notification={notification}
              index={key}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewSongs;
