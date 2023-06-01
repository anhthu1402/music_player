import React from "react";
import { QueueRounded, FileDownloadOutlined } from "@mui/icons-material";
import { useContext, useRef } from "react";
import { deletePlaylist, showNotification } from "../service";
import Popup from "reactjs-popup";
import ModifyPlaylist from "./ModifyPlaylist";
import { Button } from "@mui/material";
import NotificationContext from "../NotificationContext";

function AlbumPopup({ playlistDetail, userId, closePopup, popupRef }) {
  return <div></div>;
}

export default AlbumPopup;
