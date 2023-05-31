import React from "react";
import PlaylistItem from "./Item/PlaylistItem";
import { MyPlaylistData } from "./Data/MyPlaylistData";
import "../styles/MyPlaylist.css";
import { Card, Typography, Grid } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { getMyPlaylists } from "./API/getMyPlaylists";
import CreateNewPlaylist from "./CreateNewPlaylist";

function MyPlaylist() {
  return (
    <Grid
      container
      className="myPlaylist"
      rowSpacing={1}
      columnSpacing={{ sm: 2, xs: 1 }}
    >
      <Grid item sm={3} xs={4}>
        <CreateNewPlaylist />
      </Grid>
      {getMyPlaylists.map((item, index) => (
        <Grid item sm={3} xs={4}>
          <PlaylistItem item={item} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MyPlaylist;
