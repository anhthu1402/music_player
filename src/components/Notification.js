import React, { useContext } from "react";
import { Alert, Stack } from "@mui/material";
import NotificationContext from "../NotificationContext";

function Notification() {
  const notification = useContext(NotificationContext);
  setTimeout(() => {
    if (notification.isUsing === true) {
      notification.setUsing(false);
    }
  }, 5000);
  return notification.isUsing ? (
    <Stack sx={{ width: "100%" }} spacing={2}>
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
