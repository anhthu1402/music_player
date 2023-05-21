import React, { useState, useContext } from "react";
import "../styles/Song.css";
import FavoriteSong from "../components/FavoriteSong";
import UploadedSong from "../components/UploadedSong";
import MusicPlayerContext from "../MusicPlayerContext";

function Song() {
  const player = useContext(MusicPlayerContext);
  const [favorite, setFavorite] = useState(true);
  const Page = favorite ? FavoriteSong : UploadedSong;
  return (
    <div className="librarySong">
      <div>
        <div className="horizoneLine"></div>
        <div className="librarySongBtn">
          <button
            className={favorite ? "songActiveBtn" : "songInactiveBtn"}
            onClick={() => setFavorite(true)}
          >
            Yêu thích
          </button>
          <button
            className={favorite ? "songInactiveBtn" : "songActiveBtn"}
            onClick={() => setFavorite(false)}
          >
            Đã tải lên
          </button>
        </div>
      </div>
      <div className="librarySongContent">
        <Page />
      </div>
      <div style={player.isUsing ? { height: "7em" } : { height: 0 }}></div>
    </div>
  );
}

export default Song;
