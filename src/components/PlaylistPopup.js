import React from "react";
import {
  QueueRounded,
  FileDownloadOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { useContext, useRef } from "react";
import {
  deletePlaylist,
  showNotification,
  addPlaylistToLocalPlaylist,
} from "../service";
import Popup from "reactjs-popup";
import ModifyPlaylist from "./ModifyPlaylist";
import { Button } from "@mui/material";
import NotificationContext from "../NotificationContext";
import MusicPlayerContext from "../MusicPlayerContext";

function PlaylistPopup({
  playlistDetail,
  userId,
  closePopup,
  popupRef,
  length,
}) {
  const deleteRef = useRef();
  const closeDeletePopup = () => deleteRef.current.close();
  const openDeletePopup = () => deleteRef.current.open();
  const modifyRef = useRef();
  const closeModifyPopup = () => modifyRef.current.close();
  const openModifyPopup = () => modifyRef.current.open();
  const notification = useContext(NotificationContext);
  const musicPlayer = useContext(MusicPlayerContext);
  return (
    <div>
      <Popup
        ref={popupRef}
        contentStyle={{
          zIndex: "10",
          width: "20%",
          padding: 0,
        }}
      >
        <div
          className="playlistItemPopup"
          onClick={() => {
            addPlaylistToLocalPlaylist(playlistDetail.id, musicPlayer);
            showNotification(
              notification,
              "Đã thêm " + length + " bài hát vào danh sách phát"
            );
            closePopup();
          }}
        >
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
        id={playlistDetail.id}
        modifyRef={modifyRef}
        name={playlistDetail.playlistName}
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
            Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Các bài hát do bạn
            tải lên sẽ vẫn được giữ lại. Bạn có muốn xóa?
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
                deletePlaylist(playlistDetail.id, userId);
                closeDeletePopup();
                showNotification(
                  notification,
                  "Xóa playlist " + playlistDetail.playlistName + " thành công"
                );
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

export default PlaylistPopup;
