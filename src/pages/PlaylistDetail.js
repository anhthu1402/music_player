import React from "react";
import { useLocation } from "react-router-dom";
import {
  PlayArrowRounded,
  MoreHoriz,
  EditRounded,
  PlayCircle,
} from "@mui/icons-material";
import "../styles/PlaylistDetail.css";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { useState } from "react";
import TrackItem from "../components/Item/TrackItem";

const PlaylistDetail = () => {
  const location = useLocation();
  const playlist = location.state;
  const tracks = playlist.songPlaylist;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const play = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
    localStorage.setItem("currentTime", 0);
    song.setCurrentTime(0);
    song.setPlaylist(tracks);
    song.setPlay(true);
    localStorage.setItem("song", JSON.stringify(tracks[rnd]));
    localStorage.setItem("tracks", JSON.stringify(tracks));
    localStorage.setItem("index", JSON.stringify(rnd));
    localStorage.setItem("play", JSON.stringify(true));
    localStorage.setItem("playlist", JSON.stringify(tracks));
  };
  return (
    <div className="playlistDetailContainer">
      {playlist && (
        <div className="playlistDetail">
          <div className="detail">
            <div className="playlistImg">
              <img
                src={require(`${playlist.playlistImg}`)}
                alt={playlist.playlistName}
              />
              <PlayCircle className="playPlaylist" onClick={play} />
            </div>
            <div>
              <h1
                style={{
                  marginTop: "20px",
                  fontSize: "2.2vw",
                }}
              >
                {playlist.playlistName}
                <EditRounded sx={{ marginLeft: "10px" }} />
              </h1>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "1.2vw",
                }}
              >
                Tạo bởi{" "}
                <span style={{ color: "grey", fontWeight: "bold" }}>
                  {playlist.user}
                </span>
              </p>
              <div className="detailButton">
                <button className="playButton" onClick={play}>
                  <PlayArrowRounded sx={{ marginRight: "5px" }} />
                  Phát ngẫu nhiên
                </button>
                <button className="moreButton">
                  <MoreHoriz />
                </button>
              </div>
            </div>
          </div>
          <div className="songs">
            {playlist.songPlaylist.map((item, index) => (
              <div className="song shadowDiv">
                <TrackItem
                  key={index}
                  item={item}
                  tracks={tracks}
                  song={song}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={song.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
};

export default PlaylistDetail;
