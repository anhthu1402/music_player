import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/MyRecently.css";
import RecentlySong from "./RecentlySong";
import RecentlyPlaylist from "./RecentlyPlaylist";

function MyRecently() {
  const { search } = useLocation();
  const match = search.match(/type=(.*)/);
  const type = match?.[1];
  const [song, setSongPage] = useState(type === "song" ? true : false);
  return (
    <div className="recently">
      <div className="recentlyHeader">
        <h1>Gần đây</h1>
        <div className="indexRecentlyBtn">
          <Link to={"/recently?type=song"}>
            <button className={type === "song" ? "selected" : ""} 
                    onClick={() => setSongPage(true)}>Bài hát</button>
          </Link>
          <Link to={"/recently?type=playlist"}>
            <button className={type === "song" ? "" : "selected"} 
                    onClick={() => setSongPage(false)}>Playlist</button>
          </Link>
        </div>
      </div>
      <div className={type === "song" ? "Song" : "Playlist"}>
        <hr style={{ border: `0.1px solid rgba(128, 128, 128, 0.356)`, marginTop: `-16.5px`}}></hr>
        {/* <hr
          className={type === "song" ? "recentlySong" : "recentlyPlaylist"}
          style={{
            border: `1.6px solid #FF9EB6`,
            marginTop: `-2.5px`,
          }}
        ></hr> */}
        <div className="recentlyContent">
          {type === "song" && <RecentlySong />}
          {type === "playlist" && <RecentlyPlaylist />}
        </div>
      </div>
    </div>
  );
}

export default MyRecently;
