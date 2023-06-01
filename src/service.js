import { SongData } from "./components/Data/SongData";
import { PlaylistData } from "./components/Data/PlaylistData";
import { AlbumData } from "./components/Data/AlbumData";
import React, { useContext } from "react";
import MusicPlayerContext from "./MusicPlayerContext";
import NotificationContext from "./NotificationContext";

export const getSongDetail = (songId) => {
  return SongData.find((song) => song.id === songId);
};

export const getPlaylistDetail = (playlistId) => {
  return PlaylistData.find((playlist) => playlist.id === playlistId);
};

export const getAlbumDetail = (albumId) => {
  return AlbumData.find((album) => album.id === albumId);
};

export const changePlaylistName = (playlistId, name) => {
  console.log(playlistId, name);
};

export const createPlaylist = (playlistName) => {
  console.log(playlistName);
};
//Vao trang TrackItem de sua tham so truyen vao cua ham
export const addFavSong = (songId, userId) => {
  console.log(songId, userId);
};

export const addToPlaylist = (songId, playlistId) => {
  console.log(songId, playlistId);
};

export const deletePlaylist = (playlistId, userId) => {
  console.log(playlistId, userId);
};

export const addFavPlaylist = (playlistId, userId) => {
  console.log(playlistId, userId);
};
export const removeFromFavPlaylist = (playlistId, userId) => {
  console.log(playlistId, userId);
};
export const removeFromFavSong = (songId, userId) => {
  console.log(songId, userId);
};

export const showNotification = (notification, content) => {
  notification.setUsing(true);
  notification.setContent(content);
};

export const addToLocalPlaylist = (songId, musicPlayer) => {
  const songDetail = getSongDetail(songId);
  const playlist = musicPlayer.playlist;
  playlist.push(songDetail);
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addPlaylistToLocalPlaylist = (playlistId, musicPlayer) => {
  const playlistDetail = getPlaylistDetail(playlistId);
  const playlist = musicPlayer.playlist;
  playlistDetail.songPlaylist.map((item, index) => {
    playlist.push(item);
  });
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};
