import React from "react";
import {
  FavoriteBorderOutlined,
  FavoriteRounded,
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
import NotificationContext from "../../NotificationContext";
import JSZip from "jszip";
import saveAs from "file-saver";
import { showNotification } from "../../service";
import { useSelector } from "react-redux";

function HomeAlbumItem({ item }) {
  const { isAuthed } = useSelector((state) => state.auth);
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
  const [isFavorite, setFavorite] = useState(false);
  const notification = useContext(NotificationContext);
  const downloadAlbum = () => {
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
          src={item.albumImage}
          className="imagePlaylist"
          alt={item.albumImage}
          title={item.albumImage}
        />
        <div className="playPlaylist">
          {isAuthed ? (
            isFavorite ? (
              <FavoriteRounded
                className="icon"
                fontSize="large"
                style={{ color: "#ff7394" }}
                onClick={() => {
                  setFavorite(false);
                  showNotification(
                    notification,
                    "Đã xóa album khỏi thư viện yêu thích"
                  );
                }}
              />
            ) : (
              <FavoriteBorderOutlined
                className="icon"
                fontSize="large"
                style={{ color: "white" }}
                onClick={() => {
                  setFavorite(true);
                  showNotification(
                    notification,
                    "Đã thêm album vào thư viện yêu thích"
                  );
                }}
              />
            )
          ) : (
            <FavoriteBorderOutlined
              className="icon"
              fontSize="large"
              style={{ color: "white" }}
              onClick={() => {
                showNotification(
                  notification,
                  "Đăng nhập để thêm album vào thư viện yêu thích"
                );
              }}
            />
          )}
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
