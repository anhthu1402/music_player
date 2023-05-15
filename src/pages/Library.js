import React, { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "../styles/Library.css";
import Song from "./Song";
import Playlist from "./Playlist";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";

function Library() {
  const musicPlayer = useContext(MusicPlayerContext);
  const { search } = useLocation();
  const match = search.match(/type=(.*)/);
  const type = match?.[1];
  const [song, setSongPage] = useState(type === "song" ? true : false);

  return (
    <div className="library">
      <div className="libraryHeader">
        <h1>Thư viện</h1>
        <button>
          <PlayCircleOutlineIcon
            style={{ fontSize: `xx-large`, color: `pink` }}
          />
        </button>
      </div>
      <div className="librarySubHeader">
        <Link
          className="librarySongLink"
          to={"/library?type=song"}
          onClick={() => setSongPage(true)}
        >
          <button>Bài hát</button>
        </Link>
        <Link to={"/library?type=playlist"} onClick={() => setSongPage(false)}>
          <button>Playlist</button>
        </Link>
      </div>
      <div className={song ? "Song" : "Playlist"}>
        <hr style={{ border: `0.1px solid rgba(128, 128, 128, 0.356)` }}></hr>
        <hr
          className={song ? "indexSong" : "indexPlaylist"}
          style={{
            border: `1.6px solid #FF9EB6`,
            marginTop: `-3px`,
          }}
        ></hr>
        <div className="libraryContent">
          {type === "song" && <Song />}
          {type === "playlist" && <Playlist />}
        </div>
        <div
          style={musicPlayer.isUsing ? { height: "2em" } : { height: "1em" }}
        ></div>
      </div>
    </div>
  );
}

export default Library;
