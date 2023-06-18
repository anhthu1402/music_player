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
import { addFavPlaylist, removeFromFavPlaylist } from "../../service";
import PlaylistPopup from "../PlaylistPopup";
import { Tooltip } from "@mui/material";
import JSZip from "jszip";
import saveAs from "file-saver";

function PlaylistAtHome({ item }) {
  const tracks = item.songPlaylist;
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
  const downloadPlaylist = () => {
    const zip = new JSZip();
    tracks.map((item, index) => {
      var filename = item.songName + ".mp3";
      zip.file(filename, item.songLink, { binary: true });
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "uitmp3.zip");
    });
    // setTimeout(() => {
    //   notification.setUsing(true);
    //   notification.setContent("Đã tải " + length + " bài hát.");
    // }, 2000);
  };

  return (
    <>
      <div className="playlistItem">
        <img
          src={`${item.playlistImg}`}
          className="imagePlaylist"
          alt={item.playlistName}
          title={item.playlistName}
        />
        <div className="playPlaylist">
          {isFavorite ? (
            <FavoriteRounded
              className="icon"
              fontSize="large"
              style={{ color: "#ff7394" }}
              onClick={() => {
                removeFromFavPlaylist(item.id, userId);
                setFavorite(false);
              }}
            />
          ) : (
            <FavoriteBorderOutlined
              className="icon"
              fontSize="large"
              style={{ color: "white" }}
              onClick={() => {
                addFavPlaylist(item.id, userId);
                setFavorite(true);
              }}
            />
          )}
          <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
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
            playlistDetail={item}
            userId={userId}
            popupRef={popupRef}
            closePopup={closePopup}
            length={length}
            downloadPlaylist={downloadPlaylist}
          />
        </div>
      </div>
      <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
        <h3 className="playlistName">{item.playlistName}</h3>
      </Link>
    </>
  );
}

export default PlaylistAtHome;
