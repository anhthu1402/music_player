import { SongData } from "./components/Data/SongData";
import { PlaylistData } from "./components/Data/PlaylistData";
import { AlbumData } from "./components/Data/AlbumData";
import { useContext } from "react";
import MusicPlayerContext from "./MusicPlayerContext";

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
