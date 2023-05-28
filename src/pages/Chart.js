import React, { useState, useEffect } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "../styles/Charts.css";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { SongData } from "../components/Data/SongData";
import Track from "../components/Item/TrackItem";

function Chart() {
  const musicPlayer = useContext(MusicPlayerContext);
  const [rnd, setRnd] = useState(0);
  return (
    <div className="chartContainer">
      <div className="chartHeading">
        <h1>BXH Nhạc Mới</h1>
        <button>
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
              localStorage.setItem("playlist", JSON.stringify(SongData));
              localStorage.setItem("index", JSON.stringify(rnd));
              localStorage.setItem("play", JSON.stringify(true));
              localStorage.setItem("currentTime", 0);
              musicPlayer.setCurrentTime(0);
              musicPlayer.setPlaylist(SongData);
            }}
          />
        </button>
      </div>
      <div className="chartBody">
        {SongData.map((item, index) => (
          <div className="song">
            <div className="ordinalNum">{index + 1}</div>
            <Track
              key={index}
              item={item}
              tracks={SongData}
              song={musicPlayer}
              index={index}
            />
          </div>
        ))}
      </div>
      <div
        style={musicPlayer.isUsing ? { height: "9rem" } : { height: "15px" }}
      ></div>
    </div>
  );
}

export default Chart;
