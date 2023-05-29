import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import "../styles/Artist.css";
import { Avatar, Button } from "@mui/material";
import {
  PlayCircleFilledRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
import { SongData } from "../components/Data/SongData";
import TrackItem from "../components/Item/TrackItem";
import { Grid, Box } from "@mui/material";
import { AlbumData } from "../components/Data/AlbumData";
import ArtistAlbumItem from "../components/Item/ArtistAlbumItem";
import { getAlbumDetail } from "../service";
import { getAllAlbum } from "../components/API/getAllAlbums";

function Artist() {
  const player = useContext(MusicPlayerContext);
  const location = useLocation();
  const artist = location.state;
  const tracks = SongData;
  const artistSongs = [];
  tracks.map((item, index) => {
    item.representation.map((child, key) => {
      if (child.id === artist.id) {
        artistSongs.push(item);
      }
    });
  });
  const artistAlbums = [];
  getAllAlbum.map((item, index) => {
    item.artist.map((child, key) => {
      if (child.id === artist.id) {
        artistAlbums.push(item);
      }
    });
  });
  return (
    <div>
      {artist && (
        <div className="artistDetail">
          <div className="header">
            <div className="headerDetail">
              <Avatar
                alt={artist.artistName}
                src={artist.artistImage}
                sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h1 style={{ fontSize: "3.5vw", marginRight: "1.2vw" }}>
                    {artist.artistName}
                  </h1>
                  <PlayCircleFilledRounded
                    className="buttonPlay"
                    sx={{ fontSize: "4.2vw" }}
                  />
                </div>
                <h4 style={{ fontSize: "1.2vw" }}>
                  {artist.followers} người theo dõi
                </h4>
                <Button className="followBtn">
                  <PersonAddAltRounded
                    sx={{ marginRight: "1vw", fontSize: "1.5vw" }}
                  />{" "}
                  Theo dõi
                </Button>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="songs">
              <div className="artistSongsHeader">
                <h2>Bài hát nổi bật</h2>
                <Link
                  className="link"
                  to={`/${artist.artistName}/songs`}
                  state={{ artist: artist, songs: artistSongs }}
                >
                  <p style={{ color: "black" }}>Tất cả &gt;</p>
                </Link>
              </div>
              <div className="listSongs">
                {artistSongs.map(
                  (item, index) =>
                    index < 6 && (
                      <div className="song shadowDiv">
                        <TrackItem
                          key={index}
                          item={item}
                          tracks={artistSongs}
                          song={player}
                          index={index}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="album">
              <div className="artistAlbumsHeader">
                <h2>Album</h2>
                <Link
                  className="link"
                  to={`/${artist.artistName}/albums`}
                  state={{ artist: artist, albums: artistAlbums }}
                >
                  <p style={{ color: "black" }}>Tất cả &gt;</p>
                </Link>
              </div>
              <Box
                className="artistAlbums"
                sx={{ width: "100%", position: "relative" }}
              >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  {artistAlbums.map(
                    (item, index) =>
                      index < 4 && (
                        <Grid item xs={3}>
                          <Link to={"/album/" + item.albumName} state={item.id}>
                            <ArtistAlbumItem key={index} item={item} />
                          </Link>
                        </Grid>
                      )
                  )}
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      )}
      <div style={player.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
}

export default Artist;
