import { Link } from "react-router-dom";
import React from "react";
import {
  MoreHoriz,
  FavoriteBorderOutlined,
  PlayCircleFilled,
  QueueRounded,
  PlaylistAddRounded,
  QueueMusicRounded,
  AddCircleRounded,
  FileDownloadOutlined,
  LyricsOutlined,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../../styles/TrackItem.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import {
  addFavSong,
  addToPlaylist,
  removeFromFavSong,
  showNotification,
  addToLocalPlaylist,
} from "../../service";
import CreateNewPlaylist from "../CreateNewPlaylist";
import { MyPlaylistData } from "../Data/MyPlaylistData";
import { useState } from "react";
import { useSelector } from "react-redux";

function TrackItem({ item, song, notification, index, tracks }) {
  // render() {
  const { isAuthed } = useSelector((state) => state.auth);
  function printReleaseDate(dateParam) {
    const date = new Date(dateParam);
    const DAY_IN_MS = 86400000;
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(seconds / 3600);
    const days = Math.round(seconds / 86400);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const weeks = Math.round(seconds / 604800000);

    if (seconds < 5) {
      return "Hiện tại";
    } else if (seconds < 60) {
      return `${seconds} giây trước`;
    } else if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 11) {
      return `${hours} giờ trước`;
    } else if (isToday) {
      return "Hôm nay";
    } else if (isYesterday) {
      return "Hôm qua";
    } else if (days < 7) {
      return `${days} ngày trước`;
    } else if (weeks > 0 && weeks < 4) {
      return `${weeks} tuần trước`;
    }
    return date.toJSON().slice(0, 10).split("-").reverse().join("/");
  }
  const addPlaylistRef = React.createRef();
  const closeAddPlaylistPopup = () => addPlaylistRef.current.close();
  const openAddPlaylistPopup = () => addPlaylistRef.current.open();
  const createRef = React.createRef();
  const closeCreatePlaylist = () => createRef.current.close();
  const openCreatePlaylist = () => createRef.current.open();

  const popupRef = React.createRef();
  const closePopup = () => popupRef.current.close();

  const [isFav, setFav] = useState(isAuthed ? item.isFavorite : 0);

  const downloadMusic = () => {
    fetch(item.songLink).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = item.songName + ".mp3";
        a.click();
      });
    });
  };

  return (
    <div className="item">
      <div className="songImg">
        <img src={`${item.songImage}`} alt={item.songName} />
        <PlayCircleFilled
          className="playSongIcon"
          onClick={() => {
            if (song.isUsing !== true) {
              song.setUsing(true);
            }
            song.setPlay(true);
            song.setSong(item);
            song.setTracks(tracks);
            song.setPlaylist(tracks);
            song.setSongIndex(index);
            localStorage.setItem("song", JSON.stringify(item));
            localStorage.setItem("tracks", JSON.stringify(tracks));
            localStorage.setItem("playlist", JSON.stringify(tracks));
            localStorage.setItem("index", JSON.stringify(index));
            localStorage.setItem("play", JSON.stringify(true));
            localStorage.setItem("currentTime", 0);
            song.setCurrentTime(0);
          }}
        />
      </div>
      <div className="songDetail">
        <div className="songTitle">{item.songName}</div>
        <div className="artist">
          {item.representation.map((child, index) => (
            <span key={index} item={child}>
              <Link to={`/artist/${child.artistName}`} state={child}>
                {child.artistName}
              </Link>
            </span>
          ))}
        </div>
        <div className="trackReleaseDate">
          {item.releaseDate === undefined
            ? ""
            : printReleaseDate(item.releaseDate)}
        </div>
        <div className="trackDuration">{item.timeLimit}</div>
      </div>
      <div className="rightIcon">
        {isAuthed ? (
          isFav === 0 ? (
            <FavoriteBorderOutlined
              fontSize="medium"
              className="favOutlineIcon"
              onClick={() => {
                addFavSong(item.id, 1);
                setFav(1);
                showNotification(
                  notification,
                  "Đã thêm bài hát vào thư viện yêu thích"
                );
              }}
            />
          ) : (
            <FavoriteIcon
              fontSize="medium"
              className="favIcon"
              onClick={() => {
                removeFromFavSong(item.id, 1);
                setFav(0);
                showNotification(
                  notification,
                  "Đã xóa bài hát khỏi thư viện yêu thích"
                );
              }}
            />
          )
        ) : (
          <FavoriteBorderOutlined
            fontSize="medium"
            className="favOutlineIcon"
            onClick={() => {
              showNotification(
                notification,
                "Đăng nhập để thêm bài hát vào thư viện yêu thích"
              );
            }}
          />
        )}
        <Popup
          ref={popupRef}
          contentStyle={{
            zIndex: "10",
            marginTop: 10,
            width: "20%",
            padding: 0,
          }}
          arrow={false}
          trigger={
            <Tooltip title="Khác">
              <MoreHoriz fontSize="medium" className="moreIcon" />
            </Tooltip>
          }
          position={"bottom right"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
            }}
          >
            <img
              src={`${item.songImage}`}
              alt={item.songName}
              width={50}
              height={50}
              style={{ borderRadius: "5px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
              }}
            >
              <p
                style={{
                  fontSize: `20px`,
                  fontWeight: "500",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  marginBottom: 1,
                  width: "12vw",
                  maxWidth: "400px",
                }}
              >
                {item.songName}
              </p>
              <div className="artistPopup">
                {item.representation.map((child, index) => (
                  <span key={index} item={child}>
                    <Link to={`/artist/${child.artistName}`} state={child}>
                      {child.artistName}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: 7,
            }}
          >
            <ButtonGroup variant="outlined" size="medium">
              <Button
                className="buttonPopup"
                onClick={() => {
                  downloadMusic();
                  closePopup();
                }}
              >
                <FileDownloadOutlined fontSize="small" />
                <p style={{ fontSize: "12px" }}>Tải xuống</p>
              </Button>
              <Popup
                contentStyle={{
                  zIndex: "11",
                  borderRadius: "10px",
                  padding: "20px",
                  width: "40%",
                }}
                trigger={
                  <Button className="buttonPopup">
                    <LyricsOutlined fontSize="small" />
                    <p style={{ fontSize: "12px" }}>Lời bài hát</p>
                  </Button>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="modal">
                    <div className="content">
                      <h2 style={{ padding: 3 }}>Lời bài hát</h2>
                      <div
                        className="lyric"
                        style={{
                          overflow: "scroll",
                          height: "300px",
                          padding: "10px 20px",
                          border: "1px solid lightgray",
                          borderRadius: "10px",
                        }}
                      >
                        <pre>{item.lyric}</pre>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        onClick={() => close()}
                        sx={{ borderColor: "lightgray", color: "grey" }}
                      >
                        Đóng
                      </Button>
                    </div>
                  </div>
                )}
              </Popup>
            </ButtonGroup>
          </div>
          {/* userId de tam */}
          <div
            className="songItemPopup"
            onClick={() => {
              if (isAuthed) {
                if (isFav === 0) {
                  addFavSong(item.id, 1);
                  setFav(1);
                  closePopup();
                  showNotification(
                    notification,
                    "Đã thêm bài hát vào thư viện yêu thích"
                  );
                } else {
                  removeFromFavSong(item.id, 1);
                  setFav(0);
                  closePopup();
                  showNotification(
                    notification,
                    "Đã xóa bài hát khỏi thư viện yêu thích"
                  );
                }
              } else {
                showNotification(
                  notification,
                  "Đăng nhập để thêm bài hát vào thư viện yêu thích"
                );
              }
            }}
          >
            {isFav === 0 ? (
              <FavoriteBorderOutlined
                fontSize="small"
                sx={{ color: "grey", marginRight: 1 }}
              />
            ) : (
              <FavoriteIcon
                fontSize="small"
                sx={{ color: "grey", marginRight: 1 }}
              />
            )}
            <p>{isFav === 0 ? "Thêm vào thư viện" : "Xóa khỏi thư viện"}</p>
          </div>
          <div
            className="songItemPopup"
            onClick={() => {
              addToLocalPlaylist(item, song);
              closePopup();
              showNotification(
                notification,
                "Đã thêm bài hát vào danh sách phát"
              );
            }}
          >
            <QueueRounded
              fontSize="small"
              sx={{ color: "grey", marginRight: 1 }}
            />
            <p>Thêm vào danh sách phát</p>
          </div>
          <div className="songItemPopup" onClick={openAddPlaylistPopup}>
            <PlaylistAddRounded
              fontSize="small"
              sx={{ color: "grey", marginRight: 1 }}
            />
            <p>Thêm vào playlist</p>
          </div>
        </Popup>
        <Popup
          ref={addPlaylistRef}
          contentStyle={{
            width: "17%",
            padding: 10,
            zIndex: 20,
          }}
          on={"click"}
          position={"left center"}
        >
          <div className="songItemPopup" onClick={() => openCreatePlaylist()}>
            <AddCircleRounded
              fontSize="small"
              sx={{ color: "grey", marginRight: 1 }}
            />
            <p>Tạo playlist mới</p>
          </div>
          <div>
            {MyPlaylistData.map((playlist, index) => {
              return (
                <div
                  key={index}
                  className="songItemPopup"
                  onClick={() => {
                    addToPlaylist(item.id, playlist.id);
                    closeAddPlaylistPopup();
                    showNotification(
                      notification,
                      "Đã thêm bài hát vào playlist " +
                      playlist.playlistName +
                      "."
                    );
                  }}
                >
                  <QueueMusicRounded
                    fontSize="small"
                    sx={{ color: "grey", marginRight: 1 }}
                  />
                  <p>{playlist.playlistName}</p>
                </div>
              );
            })}
          </div>
        </Popup>
        <CreateNewPlaylist
          createRef={createRef}
          closeCreatePlaylist={closeCreatePlaylist}
        />
      </div>
    </div>
  );
}
// }

export default TrackItem;
