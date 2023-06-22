import React, { useRef } from "react";
import { Button, Card, CardMedia, Tooltip, Typography } from "@mui/material";
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
import PlaylistPopup from "../PlaylistPopup";
import JSZip from "jszip";
import saveAs from "file-saver";
import NotificationContext from "../../NotificationContext";
import { useSelector } from "react-redux";

function PlaylistItem({ item }) {
  const { isAuthed } = useSelector((state) => state.auth);
  const tracks = item.songPlaylist;
  const song = useContext(MusicPlayerContext);
  const notification = useContext(NotificationContext);
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
  const downloadPlaylist = () => {
    const zip = new JSZip();
    tracks.map((item, index) => {
      var filename = item.songName + ".mp3";
      zip.file(filename, item.songLink, { binary: true });
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "uitmp3.zip");
    });
  };
  const [playlistName, setPlaylistName] = useState(item.playlistName);
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
            {isAuthed ? (
              isFavorite ? (
                <FavoriteRounded
                  sx={{ fontSize: "2.1vw", color: "#ff7394" }}
                  onClick={() => {
                    removeFromFavPlaylist(item.id, userId);
                    setFavorite(false);
                    showNotification(
                      notification,
                      "Đã xóa playlist khỏi thư viện yêu thích"
                    );
                  }}
                />
              ) : (
                <FavoriteBorderOutlined
                  sx={{ fontSize: "2.1vw", color: "white" }}
                  onClick={() => {
                    addFavPlaylist(item.id, userId);
                    setFavorite(true);
                    showNotification(
                      notification,
                      "Đã thêm playlist vào thư viện yêu thích"
                    );
                  }}
                />
              )
            ) : (
              <FavoriteBorderOutlined
                sx={{ fontSize: "2.1vw", color: "white" }}
                onClick={() => {
                  showNotification(
                    notification,
                    "Đăng nhập để thêm playlist vào thư viện yêu thích"
                  );
                }}
              />
            )}
          </button>
          <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
            <button onClick={() => play()}>
              <PlayCircleFilled sx={{ fontSize: "2.1vw", color: "white" }} />
            </button>
          </Link>
          <button>
            <Tooltip title="Khác">
              <MoreHoriz
                sx={{ fontSize: "2.1vw", color: "white" }}
                onClick={openPopup}
              />
            </Tooltip>
            <PlaylistPopup
              playlistDetail={item}
              userId={userId}
              popupRef={popupRef}
              closePopup={closePopup}
              length={length}
              downloadPlaylist={downloadPlaylist}
              setPlaylistName={setPlaylistName}
            />
          </button>
        </div>
      </div>
      <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
        <Typography
          component="header"
          sx={{ fontSize: `1.35vw`, marginTop: `0.4vw`, color: "black" }}
        >
          {playlistName}
        </Typography>
      </Link>
      <Typography component="p" color={"grey"} sx={{ fontSize: "1vw" }}>
        {item.user}
      </Typography>
    </Card>
  );
}

export default PlaylistItem;
