import React from "react";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayCircleFilled,
} from "@mui/icons-material";
import { useContext } from "react";
import MusicPlayerContext from "../../MusicPlayerContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/PlaylistAlbum.css";

function PlaylistAtHome({ item }) {
  const tracks =
    item.songPlaylist !== undefined ? item.songPlaylist : item.songs;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const play = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
    song.setPlay(true);
    localStorage.setItem("song", JSON.stringify(tracks[rnd]));
    localStorage.setItem("tracks", JSON.stringify(tracks));
    localStorage.setItem("index", JSON.stringify(rnd));
    localStorage.setItem("play", JSON.stringify(true));
    localStorage.setItem("playlist", JSON.stringify(tracks));
    localStorage.setItem("currentTime", 0);
    this.props.song.setCurrentTime(0);
    song.setPlaylist(tracks);
  };
  function getPlaylistImgUrl(url) {
    return require("../../assets/" + url);
  }
  const artists = [],
    uniqueArtist = [];
  tracks.map((item2) =>
    item2.representation.map((child) => {
      artists.push(child);
    })
  );
  uniqueArtist.push(artists[0]);
  for (let i = 1; i < artists.length; i++) {
    let dup = 0;
    for (let j = 0; j < i; j++)
      if (artists[i].artistName === artists[j].artistName) {
        dup = 1;
        break;
      }
    if (dup === 0) {
      uniqueArtist.push(artists[i]);
    }
  }
  return (
    <Link
      to={
        item.playlistName !== undefined
          ? `/playlistDetail/${item.playlistName}`
          : `/album/${item.albumName}`
      }
      state={item.playlistName !== undefined ? item : item}
    >
      <div className="playlistItem">
        <img
          src={
            item.playlistImg !== undefined
              ? getPlaylistImgUrl(`${item.playlistImg}`)
              : item.albumImage
          }
          className="imagePlaylist"
          alt={
            item.playlistName !== undefined ? item.playlistName : item.albumName
          }
          title={
            item.playlistName !== undefined ? item.playlistName : item.albumName
          }
        />
        <div className="playPlaylist">
          <FavoriteBorderOutlined
            className="icon"
            fontSize="large"
            style={{ color: "white" }}
          />
          <PlayCircleFilled
            className="icon"
            fontSize="large"
            onClick={play}
            style={{ color: "white" }}
          />
          <MoreHoriz
            className="icon"
            fontSize="large"
            style={{ color: "white" }}
          />
        </div>
      </div>
      <h3 className="playlistName">
        {item.playlistName !== undefined ? item.playlistName : item.albumName}
      </h3>
      <div className="artists">
        <span>
          {uniqueArtist.map((child, index) => {
            return (
              <span key={index} item={child} className="artist">
                <Link to={`/artist/${child.artistName}`} state={child}>
                  {child.artistName}
                </Link>
              </span>
            );
          })}
        </span>
      </div>
    </Link>
  );
}

export default PlaylistAtHome;
