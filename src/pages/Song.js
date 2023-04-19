import React, { useState } from "react";
import "../styles/Song.css";
import { Link, useLocation } from "react-router-dom";
import FavoriteSong from "../components/FavoriteSong";
import UploadedSong from "../components/UploadedSong";

function Song() {
  const [favorite, setFavorite] = useState(true);
  return (
    <div className="librarySong">
      <div>
        <div className="horizoneLine"></div>
        <div className="librarySongBtn">
          <button onClick={() => setFavorite(true)}>Yêu thích</button>
          <button onClick={() => setFavorite(false)}>Đã tải lên</button>
        </div>
      </div>
      <div className="libraryContent">
        <div className={favorite ? "favoriteSong" : "favoriteSong-hide"}>
          <FavoriteSong />
        </div>
        <div className={favorite ? "uploadedSong-hide" : "uploadedSong"}>
          <UploadedSong />
        </div>
      </div>
    </div>
  );
}

export default Song;
