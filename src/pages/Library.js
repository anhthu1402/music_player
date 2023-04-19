import React, { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "../styles/Library.css";
import Song from "./Song";
import Playlist from "./Playlist";
import { Link, useLocation } from "react-router-dom";

function Library() {
  const [song, setSongPage] = useState(true);
  const { search } = useLocation();
  const match = search.match(/type=(.*)/);
  const type = match?.[1];
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
        <Link className="librarySongLink" to={"/library?type=song"}>
          <button onClick={() => setSongPage(true)}>Bài hát</button>
        </Link>
        <Link to={"/library?type=playlist"}>
          <button onClick={() => setSongPage(false)}>Playlist</button>
        </Link>
      </div>
      <div className={song ? "Song" : "Playlist"}>
        <hr style={{ border: `0.1px solid rgba(128, 128, 128, 0.356)` }}></hr>
        <hr
          className="indexHr"
          style={{ width: `70px`, border: `1.6px solid #FF9EB6` }}
        ></hr>
        <div className="libraryContent">
          {type === "song" && <Song />}
          {type === "playlist" && <Playlist />}
        </div>
      </div>
    </div>
  );
}

export default Library;
