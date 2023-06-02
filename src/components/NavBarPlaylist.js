import {
  AddCircleOutline,
  AddCircleRounded,
  ArrowForwardIosOutlined,
  DeleteOutline,
  FileDownloadOutlined,
  Inbox,
  Mail,
  MoreHoriz,
  QueueMusicRounded,
  QueueRounded,
} from "@mui/icons-material";
import { Box, Button, SwipeableDrawer, Tooltip } from "@mui/material";
import React from "react";
import TrackItem from "./Item/TrackItem";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import NotificationContext from "../NotificationContext";
import LocalPlaylistContext from "../LocalPlaylistContext";
import Popup from "reactjs-popup";
import { getMyPlaylists } from "./API/getMyPlaylists";
import {
  addLocalPlaylistToPlaylist,
  deleteLocalPlaylist,
  showNotification,
} from "../service";
import CreateNewPlaylist from "./CreateNewPlaylist";
import { useRef } from "react";

function NavBarPlaylist() {
  const localPlaylist = useContext(LocalPlaylistContext);
  const toggleDrawer = (open) => (event) => {
    if (
      (event && event.type === "keydown" && event.key === "Tab") ||
      event.key === "Shift"
    ) {
      return;
    }
    localPlaylist.setOpen(open);
    localStorage.setItem(open);
  };
  const musicPlayer = useContext(MusicPlayerContext);
  const playlist = musicPlayer.playlist;
  const length = playlist.length;
  const notification = useContext(NotificationContext);
  const addPlaylistRef = useRef();
  const closeAddPlaylistPopup = () => addPlaylistRef.current.close();
  const openAddPlaylistPopup = () => addPlaylistRef.current.open();
  const createRef = useRef();
  const closeCreatePlaylist = () => createRef.current.close();
  const openCreatePlaylist = () => createRef.current.open();
  const deleteRef = useRef();
  const closeDeletePopup = () => deleteRef.current.close();
  const openDeletePopup = () => deleteRef.current.open();
  console.log(musicPlayer.playlist);
  return (
    <div style={{ zIndex: "8", position: "absolute" }}>
      <div>
        <SwipeableDrawer
          variant="persistent"
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
          open={localPlaylist.open}
          anchor="right"
        >
          <Box sx={{ padding: 3, width: 400 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2>Danh sách phát</h2>

              <Popup
                contentStyle={{
                  zIndex: "10",
                  width: "18%",
                  padding: 0,
                }}
                trigger={
                  <Tooltip title="Khác">
                    <MoreHoriz sx={{ cursor: "pointer" }} />
                  </Tooltip>
                }
                position={"bottom right"}
              >
                <div className="playlistItemPopup" onClick={openDeletePopup}>
                  <DeleteOutline
                    fontSize="small"
                    sx={{ color: "grey", marginRight: 1 }}
                  />
                  <p>Xóa danh sách phát</p>
                </div>
                <div className="playlistItemPopup">
                  <FileDownloadOutlined
                    fontSize="small"
                    sx={{ color: "grey", marginRight: 1 }}
                  />
                  <p>Tải danh sách phát</p>
                </div>
                <div
                  className="playlistItemPopup"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onClick={openAddPlaylistPopup}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <AddCircleOutline
                      fontSize="small"
                      sx={{ color: "grey", marginRight: 1 }}
                    />
                    <p>Thêm vào playlist</p>
                  </div>
                  <ArrowForwardIosOutlined
                    fontSize="smaller"
                    sx={{ color: "grey", marginRight: 1 }}
                  />
                </div>
              </Popup>
            </div>
            {playlist.map((item, index) => (
              <div className="song shadowDiv" key={index}>
                <TrackItem
                  key={index}
                  item={item}
                  tracks={playlist}
                  song={musicPlayer}
                  index={index}
                  notification={notification}
                />
              </div>
            ))}
          </Box>
        </SwipeableDrawer>
      </div>
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
          {getMyPlaylists.map((playlist, index) => {
            return (
              <div
                key={index}
                className="songItemPopup"
                onClick={() => {
                  addLocalPlaylistToPlaylist(playlist.id);
                  closeAddPlaylistPopup();
                  showNotification(
                    notification,
                    "Đã thêm " +
                      length +
                      " bài hát vào playlist " +
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
          <h2>Xóa danh sách phát</h2>
          <p style={{ margin: "10px 0" }}>
            Các bài hát đã lưu trong danh sách phát sẽ mất. Bạn có muốn xóa danh
            sách phát?
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
                localPlaylist.setOpen(false);
                localStorage.setItem("openLocalPlaylist", false);
                deleteLocalPlaylist(musicPlayer);
                closeDeletePopup();
                showNotification(notification, "Xóa danh sách phát thành công");
              }}
            >
              Có
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default NavBarPlaylist;
