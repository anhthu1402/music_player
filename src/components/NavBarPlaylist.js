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
import AppAppBarPlaylist from "./AppAppBarPlaylist";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
  let playlist = JSON.parse(localStorage.getItem("playlist"));
  const length = musicPlayer.playlist.length;
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

  const downloadPlaylist = () => {
    const zip = new JSZip();
    playlist.map((item, index) => {
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
            <AppAppBarPlaylist
              openAddPlaylistPopup={openAddPlaylistPopup}
              openCreatePlaylist={openCreatePlaylist}
              openDeletePopup={openDeletePopup}
              downloadPlaylist={downloadPlaylist}
            />
            {localStorage.getItem("playlist") !== null ? (
              playlist.map((item, index) => (
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
              ))
            ) : (
              <div></div>
            )}

            <div
              style={musicPlayer.isUsing ? { height: "8em" } : { height: 0 }}
            ></div>
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
                playlist = musicPlayer.playlist;
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
