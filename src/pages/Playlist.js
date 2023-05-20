import React, { useState } from "react";
import "../styles/Playlist.css";
import MyPlaylist from "../components/MyPlaylist";
import AllPlaylist from "../components/AllPlaylist";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";

function Playlist() {
  const [all, setAll] = useState(true);
  const Page = all ? AllPlaylist : MyPlaylist;
  const musicPlayer = useContext(MusicPlayerContext);

  return (
    <div className="libraryPlaylist">
      <div>
        <div className="horizoneLine"></div>
        <div className="libraryPlaylistBtn">
          <button
            className={all ? "playlistActiveBtn" : "playlistInactiveBtn"}
            onClick={() => setAll(true)}
          >
            Tất cả
          </button>
          <button
            className={all ? "playlistInactiveBtn" : "playlistActiveBtn"}
            onClick={() => setAll(false)}
          >
            Của tôi
          </button>
        </div>
      </div>
      <div className="libraryPlaylistContent">
        <Page />
      </div>
      <div
        style={musicPlayer.isUsing ? { height: "6em" } : { height: "1em" }}
      ></div>
    </div>
  );
}

export default Playlist;
