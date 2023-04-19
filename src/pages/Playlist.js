import React, { useState } from "react";
import "../styles/Playlist.css";
import MyPlaylist from "../components/MyPlaylist";
import AllPlaylist from "../components/AllPlaylist";

function Playlist() {
  const [all, setAll] = useState(true);
  const Page = all ? AllPlaylist : MyPlaylist;

  return (
    <div className="libraryPlaylist">
      <div>
        <div className="horizoneLine"></div>
        <div className="libraryPlaylistBtn">
          <button
            className={all ? "allBtn" : "noneAllBtn"}
            onClick={() => setAll(true)}
          >
            Tất cả
          </button>
          <button
            className={all ? "noneMyBtn" : "myBtn"}
            onClick={() => setAll(false)}
          >
            Của tôi
          </button>
        </div>
      </div>
      <div className="libraryPlaylistContent">
        <Page />
      </div>
    </div>
  );
}

export default Playlist;
