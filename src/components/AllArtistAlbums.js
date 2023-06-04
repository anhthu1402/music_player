import React, { useContext } from "react";
import { Grid, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ArtistAlbumItem from "./Item/ArtistAlbumItem";
import MusicPlayerContext from "../MusicPlayerContext";
import { getAlbumDetail } from "../service";

function AllArtistAlbums() {
  const location = useLocation();
  const artist = location.state.artist;
  const albums = location.state.albums;
  const albumsDetail = [];
  albums.map((item, index) => {
    albumsDetail.push(getAlbumDetail(item.id));
  });
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {albumsDetail.map((item, index) => (
            <Grid item sm={3} xs={4}>
              <Link to={"/album/" + item.albumName} state={item.id}>
                <ArtistAlbumItem key={index} item={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div
        style={musicplayer.isUsing ? { height: "9em" } : { height: "15px" }}
      ></div>
    </div>
  );
}

export default AllArtistAlbums;
