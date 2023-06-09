import React, { useContext } from "react";
import { Grid, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ArtistAlbumItem from "./Item/ArtistAlbumItem";
import MusicPlayerContext from "../MusicPlayerContext";

function AllArtistAlbums() {
  const location = useLocation();
  const artist = location.state.artist;
  const albumsDetail = location.state.albums;
  const musicplayer = useContext(MusicPlayerContext);
  return (
    <div>
      <div className="aaaHeader" style={{ marginBottom: 10 }}>
        <h2>{artist.artistName} - Tất cả album</h2>
      </div>
      <Box
        className="artistAlbums"
        sx={{ width: "100%", position: "relative" }}
      >
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {albumsDetail.map((item, index) => (
            <Grid item sm={3} xs={4}>
              <ArtistAlbumItem key={index} item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div
        style={musicplayer.isUsing ? { height: "9em" } : { height: "2em" }}
      ></div>
    </div>
  );
}

export default AllArtistAlbums;
