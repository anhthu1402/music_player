import { Link } from "react-router-dom";
import React, { Component } from "react";
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

export class UploadedSongItem extends Component {
  render() {
    const addPlaylistRef = React.createRef();
    const closeAddPlaylistPopup = () => addPlaylistRef.current.close();
    const openAddPlaylistPopup = () => addPlaylistRef.current.open();
    const createRef = React.createRef();
    const closeCreatePlaylist = () => createRef.current.close();
    const openCreatePlaylist = () => createRef.current.open();

    const popupRef = React.createRef();
    const closePopup = () => popupRef.current.close();
    return (
      <div className="item">
        <div className="songImg">
          <img
            src={`${this.props.item.songImage}`}
            alt={this.props.item.songName}
          />
          <PlayCircleFilled
            className="playSongIcon"
            onClick={() => {
              if (this.props.song.isUsing !== true) {
                this.props.song.setUsing(true);
              }
              this.props.song.setPlay(true);
              this.props.song.setSong(this.props.item);
              this.props.song.setTracks(this.props.tracks);
              this.props.song.setPlaylist(this.props.tracks);
              this.props.song.setSongIndex(this.props.index);
              localStorage.setItem("song", JSON.stringify(this.props.item));
              localStorage.setItem("tracks", JSON.stringify(this.props.tracks));
              localStorage.setItem(
                "playlist",
                JSON.stringify(this.props.tracks)
              );
              localStorage.setItem("index", JSON.stringify(this.props.index));
              localStorage.setItem("play", JSON.stringify(true));
              localStorage.setItem("currentTime", 0);
              this.props.song.setCurrentTime(0);
            }}
          />
        </div>
        <div className="songDetail">
          <div className="songTitle">{this.props.item.songName}</div>
          <div className="artist">{this.props.item.representation}</div>

          <div className="trackDuration">{this.props.item.timeLimit}</div>
        </div>
        <div className="rightIcon">
          {this.props.item.isFavorite === 0 ? (
            <FavoriteBorderOutlined
              fontSize="medium"
              className="favOutlineIcon"
              onClick={() => addFavSong(this.props.item.id, 1)}
            />
          ) : (
            <FavoriteIcon
              fontSize="medium"
              className="favIcon"
              onClick={() => removeFromFavSong(this.props.item.id, 1)}
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
                src={`${this.props.item.songImage}`}
                alt={this.props.item.songName}
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
                  {this.props.item.songName}
                </p>
                <div className="artistPopup">
                  {this.props.item.representation}
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
                <Button className="buttonPopup">
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
                          {Object.hasOwn(this.props.item, "lyric") === false ? (
                            <div>Bài hát hiện không có lời</div>
                          ) : (
                            <pre>{this.props.item.lyric}</pre>
                          )}
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
                addFavSong(this.props.item.id, 1);
                closePopup();
                showNotification(
                  this.props.notification,
                  "Đã thêm bài hát vào thư viện yêu thích"
                );
              }}
            >
              <FavoriteBorderOutlined
                fontSize="small"
                sx={{ color: "grey", marginRight: 1 }}
              />
              <p>Thêm vào thư viện</p>
            </div>
            <div
              className="songItemPopup"
              onClick={() => {
                addToLocalPlaylist(this.props.item, this.props.song);
                closePopup();
                showNotification(
                  this.props.notification,
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
                      addToPlaylist(this.props.item.id, playlist.id);
                      closeAddPlaylistPopup();
                      showNotification(
                        this.props.notification,
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
}

export default UploadedSongItem;
