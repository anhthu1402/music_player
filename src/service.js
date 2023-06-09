import { PlaylistData } from "./components/Data/PlaylistData";
import { AlbumData } from "./components/Data/AlbumData";
import JSZip from "jszip";
import saveAs from "file-saver";

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
  setTimeout(() => {
    notification.setUsing(false);
    notification.setContent("");
  }, 5000);
};

export const addToLocalPlaylist = (song, musicPlayer) => {
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  playlist.push(song);
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addPlaylistToLocalPlaylist = (playlistId, musicPlayer) => {
  const playlistDetail = getPlaylistDetail(playlistId);
  const playlist =
    localStorage.getItem("playlist") !== null
      ? JSON.parse(localStorage.getItem("playlist"))
      : musicPlayer.playlist;
  playlistDetail.songPlaylist.map((item, index) => {
    playlist.push(item);
  });
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addAlbumToLocalPlaylist = (albumId, musicPlayer) => {
  const albumDetail = getAlbumDetail(albumId);
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  albumDetail.songs.map((item, key) => {
    playlist.push(item);
  });
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addLocalPlaylistToPlaylist = (playlistId) => {
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  playlist.map((item, index) => {
    addToPlaylist(item.id, playlistId);
  });
  console.log(playlist);
};

export const deleteLocalPlaylist = (musicPlayer) => {
  localStorage.removeItem("playlist");
  musicPlayer.setPlaylist([]);
  localStorage.removeItem("song");
  localStorage.removeItem("tracks");
  localStorage.removeItem("index");
  localStorage.removeItem("currentTime");
  musicPlayer.setUsing(false);
  localStorage.setItem("play", false);
};

export const changeUserName = (userId, name) => {
  console.log(userId, name);
};

export const uploadSong = (
  songName,
  songLink,
  representation,
  songImage,
  timeLimit,
  userId
) => {
  console.log(
    songName + ",",
    songLink + ",",
    songImage + ",",
    representation + ",",
    timeLimit + ",",
    userId
  );
  console.log("successful upload");
};
