import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import Popup from "reactjs-popup";
import { TextField } from "@mui/material";
import { changePlaylistName } from "../service";

function ModifyPlaylist({ closeModifyPopup, name, modifyRef, id }) {
  const [disabled, setDisabled] = useState(false);
  const nameRef = useRef();
  return (
    <Popup
      ref={modifyRef}
      contentStyle={{
        zIndex: "11",
        borderRadius: "10px",
        padding: "20px",
        width: "25%",
      }}
      onClose={() => setDisabled(false)}
      modal
      nested
    >
      <div className="modal">
        <p
          onClick={closeModifyPopup}
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
            <h2 style={{ marginBottom: "20px" }}>Chỉnh sửa playlist</h2>
          </div>
          <TextField
            required
            onChange={(e) => {
              nameRef.current.value = e.target.value;
              if (nameRef.current.value === "") setDisabled(true);
              else setDisabled(false);
            }}
            inputRef={nameRef}
            placeholder="Nhập tên playlist"
            defaultValue={name}
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
              changePlaylistName(id, nameRef.current.value);
              closeModifyPopup();
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

export default ModifyPlaylist;
