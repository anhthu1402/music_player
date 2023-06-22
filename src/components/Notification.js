import React, { useContext } from "react";
import { Alert, Stack } from "@mui/material";
import NotificationContext from "../NotificationContext";
import MusicPlayerContext from "../MusicPlayerContext";

function Notification() {
  const notification = useContext(NotificationContext);
  const song = useContext(MusicPlayerContext);
  return notification.isUsing ? (
    <Stack
      className="notification"
      style={song.isUsing ? { bottom: "17.5vh" } : { bottom: "5vh" }}
      spacing={2}
    >
      <Alert
        onClose={() => {
          notification.setUsing(false);
          notification.setContent("");
        }}
      >
        {notification.content}
      </Alert>
    </Stack>
  ) : (
    <div></div>
  );
}

export default Notification;
