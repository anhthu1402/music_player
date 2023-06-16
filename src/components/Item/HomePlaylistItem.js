import React from "react";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayCircleFilled,
  FavoriteRounded,
} from "@mui/icons-material";
import { useContext, useRef } from "react";
import MusicPlayerContext from "../../MusicPlayerContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/PlaylistAlbum.css";
import {
  getPlaylistDetail,
  addFavPlaylist,
  removeFromFavPlaylist,
} from "../../service";
import PlaylistPopup from "../PlaylistPopup";
import { Tooltip } from "@mui/material";

function PlaylistAtHome({ id }) {
  const playlistDetail = getPlaylistDetail(id);
  const tracks = playlistDetail.songPlaylist;
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
  const userId = 1;
  const popupRef = useRef();
  const closePopup = () => popupRef.current.close();
  const openPopup = () => popupRef.current.open();
  const [isFavorite, setFavorite] = useState(false);

  return (
    <>
      <div className="playlistItem">
        <img
          src={`${playlistDetail.playlistImg}`}
          className="imagePlaylist"
          alt={playlistDetail.playlistName}
          title={playlistDetail.playlistName}
        />
        <div className="playPlaylist">
          {isFavorite ? (
            <FavoriteRounded
              className="icon"
              fontSize="large"
              style={{ color: "#ff7394" }}
              onClick={() => {
                removeFromFavPlaylist(playlistDetail.id, userId);
                setFavorite(false);
              }}
            />
          ) : (
            <FavoriteBorderOutlined
              className="icon"
              fontSize="large"
              style={{ color: "white" }}
              onClick={() => {
                addFavPlaylist(playlistDetail.id, userId);
                setFavorite(true);
              }}
            />
          )}
          <Link
            to={`/playlistDetail/${playlistDetail.playlistName}`}
            state={id}
          >
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
          <PlaylistPopup
            playlistDetail={playlistDetail}
            userId={userId}
            popupRef={popupRef}
            closePopup={closePopup}
            length={length}
          />
        </div>
      </div>
      <Link
        to={`/playlistDetail/${playlistDetail.playlistName}`}
        state={playlistDetail.id}
      >
        <h3 className="playlistName">{playlistDetail.playlistName}</h3>
      </Link>
    </>
  );
}

export default PlaylistAtHome;
