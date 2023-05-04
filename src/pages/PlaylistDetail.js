import React from "react";
import { useLocation } from "react-router-dom";
import {
  PlayArrowRounded,
  MoreHoriz,
  EditRounded,
  PlayCircle,
} from "@mui/icons-material";
import "../styles/PlaylistDetail.css";
import SongItem from "../components/Item/SongItem";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { useState } from "react";

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
    <div>
      {playlist && (
        <div
          className={
            song.isUsing ? "playlistDetail active" : "playlistDetail inactive"
          }
        >
          <div className="detail">
            <div className="playlistImg">
              <img
                src={require(`../assets/${playlist.playlistImg}`)}
                alt={playlist.playlistName}
                width="350px"
              />
              <PlayCircle className="playPlaylist" onClick={play} />
            </div>
            <h1 style={{ margin: "20px" }}>
              {playlist.playlistName}
              <EditRounded sx={{ marginLeft: "10px" }} />
            </h1>
            <button className="playButton" onClick={play}>
              <PlayArrowRounded sx={{ marginRight: "5px" }} />
              Phát ngẫu nhiên
            </button>
            <button className="moreButton">
              <MoreHoriz />
            </button>
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
    </div>
  );
};

export default PlaylistDetail;
