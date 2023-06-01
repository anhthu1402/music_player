import React, { useRef } from "react";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
  FileDownloadOutlined,
  MoreHoriz,
  PlayCircleFilled,
  QueueRounded,
} from "@mui/icons-material";
import "../../styles/PlaylistItem.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  getPlaylistDetail,
  deletePlaylist,
  addFavPlaylist,
  removeFromFavPlaylist,
  showNotification,
} from "../../service";
import MusicPlayerContext from "../../MusicPlayerContext";
import ModifyPlaylist from "../ModifyPlaylist";
import Popup from "reactjs-popup";
import NotificationContext from "../../NotificationContext";
import PlaylistPopup from "../PlaylistPopup";

function PlaylistItem({ item }) {
  const notification = useContext(NotificationContext);
  const tracks = getPlaylistDetail(item.id).songPlaylist;
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
  const [isFavorite, setFavorite] = useState(false);
  //Nếu playlist thuộc user thì có thêm mục chỉnh sửa, xóa playlist khi bấm vô MoreHiriz
  //Vì chưa đăng nhập nên để tạm userId là 1
  const userId = 1;
  const popupRef = useRef();
  const closePopup = () => popupRef.current.close();
  const openPopup = () => popupRef.current.open();
  return (
    <Card className={"cardPlaylist"} sx={{ border: "none", boxShadow: "none" }}>
      <div className="cardContent">
        <CardMedia
          className="playlistMedia"
          component="img"
          style={{
            width: `18vw`,
            height: `17vw`,
            border: `0.2px solid transparent`,
            borderRadius: `15px`,
          }}
          image={`${item.playlistImg}`}
          alt={item.playlistName}
        />
        <div className="playlistMoreDetail">
          <button className="btn">
            {isFavorite ? (
              <FavoriteRounded
                sx={{ fontSize: "2.1vw", color: "#ff7394" }}
                onClick={() => {
                  removeFromFavPlaylist(item.id, userId);
                  setFavorite(false);
                }}
              />
            ) : (
              <FavoriteBorderOutlined
                sx={{ fontSize: "2.1vw", color: "white" }}
                onClick={() => {
                  addFavPlaylist(item.id, userId);
                  setFavorite(true);
                }}
              />
            )}
          </button>
          <Link to={`/playlistDetail/${item.playlistName}`} state={item.id}>
            <button onClick={() => play()}>
              <PlayCircleFilled sx={{ fontSize: "2.1vw", color: "white" }} />
            </button>
          </Link>
          <button>
            <MoreHoriz
              sx={{ fontSize: "2.1vw", color: "white" }}
              onClick={openPopup}
            />
            <PlaylistPopup
              playlistDetail={item}
              userId={userId}
              popupRef={popupRef}
              closePopup={closePopup}
              length={length}
            />
          </button>
        </div>
      </div>
      <Typography
        component="header"
        sx={{ fontSize: `1.35vw`, marginTop: `0.4vw` }}
      >
        {item.playlistName}
      </Typography>
      <Typography component="p" color={"grey"} sx={{ fontSize: "1vw" }}>
        {item.user}
      </Typography>
    </Card>
  );
}

export default PlaylistItem;
