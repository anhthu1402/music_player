import React from "react";

import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayCircleFilled,
} from "@mui/icons-material";
import { useContext } from "react";
import MusicPlayerContext from "../../MusicPlayerContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function PlaylistAtHome({ item }) {
  const tracks = item.playlistSongs;
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
  function getPlaylistImgUrl(url) {
    return require("../../assets/" + url);
  }
  return (
    <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
      <div className="playlistItem">
        <img
          src={getPlaylistImgUrl(`${item.playlistImg}`)}
          className="imagePlaylist"
          alt={item.playlistName}
          title={item.playlistName}
        />
        <div className="playPlaylist">
          <FavoriteBorderOutlined
            className="icon"
            fontSize="large"
            style={{ color: "white" }}
          />
          <PlayCircleFilled
            className="icon"
            fontSize="large"
            onClick={play}
            style={{ color: "white" }}
          />
          <MoreHoriz
            className="icon"
            fontSize="large"
            style={{ color: "white" }}
          />
        </div>
      </div>
      <h3 className="playlistName">{item.playlistName}</h3>
      <div className="artists">
        {item.playlistSongs.map((item2, key2) => (
          <span>
            {item2.artist.map((child, index) => {
              return (
                <span key={index} item={child} className="artist">
                  <Link to={`/artist/${child.artistName}`} state={child}>
                    {child.artistName}
                  </Link>
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default PlaylistAtHome;
