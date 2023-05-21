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
import SongItem from "../components/Item/SongItem";

const PlaylistDetail = () => {
  const location = useLocation();
  const playlist = location.state;
  const tracks = playlist.playlistSongs;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const play = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
  };
  return (
    <div className="playlistDetailContainer">
      {playlist && (
        <div className="playlistDetail">
          <div className="detail">
            <div className="playlistImg">
              <img
                src={require(`../assets/${playlist.playlistImg}`)}
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
            {playlist.playlistSongs.map((item, index) => (
              <SongItem
                key={index}
                item={item}
                tracks={tracks}
                song={song}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
      <div style={song.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
};

export default PlaylistDetail;
