import React, { useContext } from "react";
import PlaylistItem from "./Item/PlaylistItem";
import { MyPlaylistData } from "./Data/MyPlaylistData";
import "../styles/MyPlaylist.css";
import MusicPlayerContext from "../MusicPlayerContext";
import { Card, CardContent, Typography } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";

function MyPlaylist() {
  const song = useContext(MusicPlayerContext);
  return (
    <div className={song.isUsing ? "myPlaylist active" : "myPlaylist inactive"}>
      <Card
        className="createNew"
        sx={{
          width: "250px",
          height: "320px",
          backgroundColor: "#FEE9EF",
          borderRadius: "15px",
        }}
      >
        <AddCircleRounded
          sx={{ fontSize: "5em", color: "#FF9EB6", cursor: "pointer" }}
        />
        <CardContent>
          <Typography variant="h6">Tạo playlist mới</Typography>
        </CardContent>
      </Card>
      {MyPlaylistData.map((item, index) => (
        <PlaylistItem item={item} key={index} />
      ))}
    </div>
  );
}

export default MyPlaylist;
