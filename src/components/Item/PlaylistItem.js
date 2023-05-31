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
} from "../../service";
import MusicPlayerContext from "../../MusicPlayerContext";
import ModifyPlaylist from "../ModifyPlaylist";
import Popup from "reactjs-popup";

function PlaylistItem({ item }) {
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
  const deleteRef = useRef();
  const closeDeletePopup = () => deleteRef.current.close();
  const openDeletePopup = () => deleteRef.current.open();
  const modifyRef = useRef();
  const closeModifyPopup = () => modifyRef.current.close();
  const openModifyPopup = () => modifyRef.current.open();
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
            <Popup
              contentStyle={{
                zIndex: "10",
                marginTop: 10,
                width: "20%",
                padding: 0,
              }}
              arrow={false}
              position={"bottom right"}
              trigger={<MoreHoriz sx={{ fontSize: "2.1vw", color: "white" }} />}
            >
              <div className="playlistItemPopup">
                <QueueRounded
                  fontSize="small"
                  sx={{ color: "grey", marginRight: 1 }}
                />
                <p>Thêm vào danh sách phát</p>
              </div>
              <div className="playlistItemPopup">
                <FileDownloadOutlined
                  fontSize="small"
                  sx={{ color: "grey", marginRight: 1 }}
                />
                <p>Tải xuống</p>
              </div>
              {/* Giả sử userId đã đăng nhập là 1 */}
              {userId === 1 ? (
                <div>
                  <div className="playlistItemPopup" onClick={openModifyPopup}>
                    <EditOutlined
                      fontSize="small"
                      sx={{ color: "grey", marginRight: 1 }}
                    />
                    <p>Chỉnh sửa playlist</p>
                  </div>
                  <div className="playlistItemPopup" onClick={openDeletePopup}>
                    <DeleteOutline
                      fontSize="small"
                      sx={{ color: "grey", marginRight: 1 }}
                    />
                    <p>Xóa playlist</p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </Popup>
            <ModifyPlaylist
              id={item.id}
              modifyRef={modifyRef}
              name={item.playlistName}
              closeModifyPopup={closeModifyPopup}
            />
            <Popup
              ref={deleteRef}
              modal
              lockScroll={true}
              contentStyle={{
                zIndex: "11",
                borderRadius: "10px",
                padding: "25px 30px",
                width: "40%",
              }}
            >
              <div>
                <h2>Xóa playlist</h2>
                <p style={{ margin: "10px 0" }}>
                  Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Các bài hát
                  do bạn tải lên sẽ vẫn được giữ lại. Bạn có muốn xóa?
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                      marginRight: "30px",
                      ":hover": {
                        backgroundColor: "lightgray",
                      },
                    }}
                    onClick={closeDeletePopup}
                  >
                    Không
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff7394",
                      ":hover": {
                        backgroundColor: "rgb(244, 161, 175)",
                      },
                    }}
                    onClick={(e) => {
                      deletePlaylist(item.id, userId);
                      closeDeletePopup();
                    }}
                  >
                    Có
                  </Button>
                </div>
              </div>
            </Popup>
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
