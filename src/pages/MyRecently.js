import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/MyRecently.css";
import RecentlySong from "./RecentlySong";
import RecentlyPlaylist from "./RecentlyPlaylist";
import { useSelector } from "react-redux";

function MyRecently() {
  const { search } = useLocation();
  const match = search.match(/type=(.*)/);
  const type = match?.[1];
  const [song, setSongPage] = useState(type === "song" ? true : false);
  const { isAuthed } = useSelector((state) => state.auth);
  return (
    <div className="recently">
      {isAuthed ? (
        <div>
          <div className="recentlyHeader">
            <h1>Gần đây</h1>
            <div className="indexRecentlyBtn">
              <Link to={"/recently?type=song"}>
                <button
                  className={type === "song" ? "selected" : ""}
                  onClick={() => setSongPage(true)}
                >
                  Bài hát
                </button>
              </Link>
              <Link to={"/recently?type=playlist"}>
                <button
                  className={type === "song" ? "" : "selected"}
                  onClick={() => setSongPage(false)}
                >
                  Playlist
                </button>
              </Link>
            </div>
          </div>
          <div className={type === "song" ? "Song" : "Playlist"}>
            <hr
              style={{
                border: `0.1px solid rgba(128, 128, 128, 0.356)`,
                marginTop: `-16.5px`,
              }}
            ></hr>
            <div className="recentlyContent">
              {type === "song" && <RecentlySong />}
              {type === "playlist" && <RecentlyPlaylist />}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MyRecently;
