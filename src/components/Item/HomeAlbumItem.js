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
import "../../styles/PlaylistAlbum.css";
import { useRef } from "react";
import AlbumPopup from "../AlbumPopup";
import { Tooltip } from "@mui/material";

function HomeAlbumItem({ item }) {
  const tracks = item.songs;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const play = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
    song.setPlay(true);
    localStorage.setItem("song", JSON.stringify(tracks[rnd]));
    localStorage.setItem("tracks", JSON.stringify(tracks));
    localStorage.setItem("index", JSON.stringify(rnd));
    localStorage.setItem("play", JSON.stringify(true));
    localStorage.setItem("playlist", JSON.stringify(tracks));
    song.setPlaylist(tracks);
  };
  const popupRef = useRef();
  const openPopup = () => popupRef.current.open();
  const closePopup = () => popupRef.current.close();
  return (
    <>
      <div className="playlistItem">
        <img
          src={item.albumImage}
          className="imagePlaylist"
          alt={item.albumImage}
          title={item.albumImage}
        />
        <div className="playPlaylist">
          <FavoriteBorderOutlined
            className="icon"
            fontSize="large"
            style={{ color: "white" }}
          />
          <Link to={`/album/${item.albumName}`} state={item}>
            <PlayCircleFilled
              className="icon"
              fontSize="large"
              onClick={play}
              style={{ color: "white" }}
            />
          </Link>
          <Tooltip title="Khác">
            <MoreHoriz
              onClick={() => openPopup()}
              className="icon"
              fontSize="large"
              style={{ color: "white" }}
            />
          </Tooltip>
          <AlbumPopup
            albumId={item.id}
            closePopup={closePopup}
            popupRef={popupRef}
          />
        </div>
      </div>
      <Link to={`/album/${item.albumName}`} state={item}>
        <h3 className="playlistName">{item.albumName}</h3>
      </Link>
      <div className="artists">
        <span>
          {item.artist.map((child, index) => {
            return (
              <span key={index} item={child} className="artist">
                <Link to={`/artist/${child.artistName}`} state={child}>
                  {child.artistName}
                </Link>
              </span>
            );
          })}
        </span>
      </div>
    </>
  );
}

export default HomeAlbumItem;
