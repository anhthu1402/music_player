import React, { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "../styles/Library.css";
import Song from "./Song";
import Playlist from "./Playlist";
import { Link, useLocation } from "react-router-dom";

function Library() {
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
          <button>Bài hát</button>
        </Link>
        <Link to={"/library?type=playlist"}>
          <button>Playlist</button>
        </Link>
      </div>
      <div className="libraryContent">
        {type === "song" && <Song />}
        {type === "playlist" && <Playlist />}
      </div>
    </div>
  );
}

export default Library;
