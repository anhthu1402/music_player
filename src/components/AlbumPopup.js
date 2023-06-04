import React from "react";
import { QueueRounded, FileDownloadOutlined } from "@mui/icons-material";
import { useContext } from "react";
import {
  addAlbumToLocalPlaylist,
  showNotification,
  getAlbumDetail,
} from "../service";
import Popup from "reactjs-popup";
import NotificationContext from "../NotificationContext";
import MusicPlayerContext from "../MusicPlayerContext";

function AlbumPopup({ albumId, closePopup, popupRef }) {
  const notification = useContext(NotificationContext);
  const musicPlayer = useContext(MusicPlayerContext);
  const albumDetail = getAlbumDetail(albumId);
  const length = albumDetail.songs.length;
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
            addAlbumToLocalPlaylist(albumId, musicPlayer);
            showNotification(
              notification,
              "Đã thêm " + length + " bài hát vào danh sách phát"
            );
            closePopup();
            console.log(albumDetail.songs);
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
      </Popup>
    </div>
  );
}

export default AlbumPopup;
