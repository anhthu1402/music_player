import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import "../styles/Artist.css";
import { Avatar, Button } from "@mui/material";
import {
  PlayCircleFilledRounded,
  PersonAddAltRounded,
  HowToRegRounded,
} from "@mui/icons-material";
import { SongData } from "../components/Data/SongData";
import TrackItem from "../components/Item/TrackItem";
import { Grid, Box } from "@mui/material";
import ArtistAlbumItem from "../components/Item/ArtistAlbumItem";
import NotificationContext from "../NotificationContext";
import { AlbumData } from "../components/Data/AlbumData";
import { showNotification } from "../service";
import { useSelector } from "react-redux";

function Artist() {
  const { isAuthed } = useSelector((state) => state.auth);
  const notification = useContext(NotificationContext);
  const player = useContext(MusicPlayerContext);
  const location = useLocation();
  const artist = location.state;
  const artistSongs = [];
  SongData.map((item, index) => {
    item.representation.map((child, key) => {
      if (child.id === artist.id) {
        artistSongs.push(item);
      }
    });
  });
  const artistAlbums = [];
  AlbumData.map((item, index) => {
    item.artist.map((child, key) => {
      if (child.id === artist.id) {
        artistAlbums.push(item);
      }
    });
  });
  const play = () => {
    if (player.isUsing !== true) {
      player.setUsing(true);
    }
    player.setPlay(true);
    player.setSong(artistSongs[0]);
    player.setTracks(artistSongs);
    player.setPlaylist(artistSongs);
    player.setSongIndex(0);
    localStorage.setItem("play", JSON.stringify(true));
    localStorage.setItem("song", JSON.stringify(artistSongs[0]));
    localStorage.setItem("tracks", JSON.stringify(artistSongs));
    localStorage.setItem("playlist", JSON.stringify(artistSongs));
    localStorage.setItem("index", JSON.stringify(0));
    localStorage.setItem("currentTime", 0);
    player.setCurrentTime(0);
  };
  const [follow, setFollow] = useState(isAuthed ? artist.isFollow : false);
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
                    alignItems: "flex-end",
                  }}
                >
                  <h1 style={{ fontSize: "3.5vw", marginRight: "1.2vw" }}>
                    {artist.artistName}
                  </h1>
                  <PlayCircleFilledRounded
                    onClick={play}
                    className="buttonPlay"
                    sx={{ fontSize: "4.2vw" }}
                  />
                </div>
                <h4 style={{ fontSize: "1.2vw" }}>
                  {artist.numberOfFollower} người theo dõi
                </h4>
                {isAuthed ? (
                  follow ? (
                    <Button
                      className="followBtn"
                      onClick={() => {
                        setFollow(false);
                        showNotification(
                          notification,
                          "Đã hủy theo dõi nghệ sĩ"
                        );
                      }}
                    >
                      <HowToRegRounded
                        sx={{ marginRight: "1vw", fontSize: "1.5vw" }}
                      />{" "}
                      Đã theo dõi
                    </Button>
                  ) : (
                    <Button
                      className="followBtn"
                      onClick={() => {
                        setFollow(true);
                        showNotification(notification, "Đã theo dõi nghệ sĩ");
                      }}
                    >
                      <PersonAddAltRounded
                        sx={{ marginRight: "1vw", fontSize: "1.5vw" }}
                      />{" "}
                      Theo dõi
                    </Button>
                  )
                ) : (
                  <Button
                    className="followBtn"
                    onClick={() => {
                      showNotification(
                        notification,
                        "Đăng nhập để sử dụng tính năng này"
                      );
                    }}
                  >
                    <PersonAddAltRounded
                      sx={{ marginRight: "1vw", fontSize: "1.5vw" }}
                    />{" "}
                    Theo dõi
                  </Button>
                )}
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
                          notification={notification}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
            {artistAlbums.length !== 0 ? (
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
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2 }}
                  >
                    {artistAlbums.map(
                      (item, index) =>
                        index < 4 && (
                          <Grid item xs={3}>
                            <ArtistAlbumItem key={index} item={item} />
                          </Grid>
                        )
                    )}
                  </Grid>
                </Box>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
      <div style={player.isUsing ? { height: "9em" } : { height: "2em" }}></div>
    </div>
  );
}

export default Artist;
