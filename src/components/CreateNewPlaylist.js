import React, { useRef, useState, useContext } from "react";
import { Button } from "@mui/material";
import Popup from "reactjs-popup";
import { TextField } from "@mui/material";
import { createPlaylist, showNotification } from "../service";
import NotificationContext from "../NotificationContext";

function CreateNewPlaylist({ createRef, closeCreatePlaylist }) {
  const [disabled, setDisabled] = useState(true);
  const name = useRef();
  const notification = useContext(NotificationContext);
  return (
    <Popup
      ref={createRef}
      contentStyle={{
        zIndex: "11",
        borderRadius: "10px",
        padding: "20px",
        width: "25%",
      }}
      onClose={() => setDisabled(true)}
      modal
      nested
    >
      <div className="modal">
        <p
          onClick={() => closeCreatePlaylist()}
          style={{
            textAlign: "right",
            marginRight: 5,
            cursor: "pointer",
          }}
        >
          X
        </p>
        <div className="content" style={{ textAlign: "center" }}>
          <div>
            <h2 style={{ marginBottom: "20px" }}>Tạo playlist mới</h2>
          </div>
          <TextField
            required
            onChange={(e) => {
              name.current.value = e.target.value;
              if (name.current.value === "") setDisabled(true);
              else setDisabled(false);
            }}
            inputRef={name}
            placeholder="Nhập tên playlist"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              createPlaylist(name.current.value);
              showNotification(
                notification,
                'Tạo playlist "' + name.current.value + '" thành công.'
              );
              closeCreatePlaylist();
            }}
            disabled={disabled}
            sx={{
              backgroundColor: "#ff7394",
              ":hover": {
                backgroundColor: "rgb(244, 161, 175)",
              },
            }}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Popup>
  );
}

export default CreateNewPlaylist;
