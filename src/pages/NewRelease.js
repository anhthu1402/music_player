import React, { useState, useEffect } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import NewSongs from "./NewSongs";
import NewAlbums from "./NewAlbums";
import "../styles/NewRelease.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { SongData } from "../components/Data/SongData";

function NewRelease() {
  const musicPlayer = useContext(MusicPlayerContext);
  const [rnd, setRnd] = useState(0);
  const { search } = useLocation();
  const match = search.match(/type=(.*)/);
  const type = match?.[1];
  const [song, setSongPage] = useState(type === "song" ? true : false);
  return (
    <div className="newReleaseContainer">
      <div className="newReleaseHeader">
        <h1>Mới phát hành</h1>
        <button style={{ display: type === "song" ? "inline-block" : "none" }}>
          <PlayCircleOutlineIcon
            className="playIcon"
            style={{ fontSize: `xx-large` }}
            onClick={() => {
              setRnd(Math.floor(Math.random() * SongData.length));
              musicPlayer.setUsing(true);
              musicPlayer.setTracks(SongData);
              musicPlayer.setSongIndex(rnd);
              musicPlayer.setSong(SongData[rnd]);
              musicPlayer.setPlay(true);
              localStorage.setItem("song", JSON.stringify(SongData[rnd]));
              localStorage.setItem("tracks", JSON.stringify(SongData));
              localStorage.setItem("index", JSON.stringify(rnd));
              localStorage.setItem("play", JSON.stringify(true));
              localStorage.setItem("playlist", JSON.stringify(SongData));
              localStorage.setItem("currentTime", 0);
              musicPlayer.setCurrentTime(0);
              musicPlayer.setPlaylist(SongData);
            }}
          />
        </button>
      </div>
      <div className="newReleaseSubHeader">
        <Link
          className="newReleaseSongLink"
          to={"/newrelease?type=song"}
          onClick={() => setSongPage(true)}
        >
          <button className={type === "song" ? "selected" : ""}>Bài hát</button>
        </Link>
        <Link to={"/newrelease?type=album"} onClick={() => setSongPage(false)}>
          <button className={type === "song" ? "" : "selected"}>Album</button>
        </Link>
      </div>
      <hr
        style={{
          border: `0.1px solid rgba(128, 128, 128, 0.356)`,
          marginTop: `-1px`,
        }}
      ></hr>
      <div className={song ? "Song" : "Album"}>
        <div className="newReleaseContent">
          {type === "song" && <NewSongs />}
          {type === "album" && <NewAlbums />}
        </div>
        <div
          style={musicPlayer.isUsing ? { height: "160px" } : { height: "15px" }}
        ></div>
      </div>
    </div>
  );
}

export default NewRelease;
