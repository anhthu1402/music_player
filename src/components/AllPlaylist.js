import React from "react";
import { Grid } from "@mui/material";
import PlaylistItem from "./Item/PlaylistItem";
import "../styles/MyPlaylist.css";
import { getAllPlaylists } from "./API/getAllPlaylists";
import CreateNewPlaylist from "./CreateNewPlaylist";

function AllPlaylist() {
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
      {getAllPlaylists.map((item, index) => (
        <Grid item sm={3} xs={4}>
          <PlaylistItem item={item} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AllPlaylist;
