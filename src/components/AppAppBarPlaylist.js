import React, { useContext, useRef } from "react";
import { CssBaseline, Tooltip, useScrollTrigger } from "@mui/material";
import AppBar from "./AppBar";
import Popup from "reactjs-popup";
import {
  AddCircleOutline,
  ArrowForwardIosOutlined,
  DeleteOutline,
  FileDownloadOutlined,
  MoreHoriz,
} from "@mui/icons-material";

function AppAppBarPlaylist({ openAddPlaylistPopup, openDeletePopup }) {
  return (
    <div style={{ marginBottom: "35px" }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
          width: 400,
          padding: 10,
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
      </AppBar>
    </div>
  );
}

export default AppAppBarPlaylist;
