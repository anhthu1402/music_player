import React, { useContext } from "react";
import PlaylistItem from "../components/Item/PlaylistItem";
import MusicPlayerContext from "../MusicPlayerContext";
import { RecentlyPlaylistData } from "../components/Data/RecentlyPlaylistData";
import { Grid } from "@mui/material";

function RecentlyPlaylist() {
  const song = useContext(MusicPlayerContext);
  return (
    <div>
      <Grid
        container
        className="myPlaylist recently"
        rowSpacing={1}
        columnSpacing={{ sm: 2, xs: 1 }}
      >
        {RecentlyPlaylistData.map((item, index) => (
          <Grid item sm={3} xs={4}>
            <PlaylistItem item={item} key={index} />
          </Grid>
        ))}
      </Grid>
      <div style={song.isUsing ? { height: "8em" } : { height: "1em" }}></div>
    </div>
  );
}

export default RecentlyPlaylist;
