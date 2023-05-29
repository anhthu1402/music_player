import { SongData } from "./components/Data/SongData";
import { RecentlyPlaylistData } from "./components/Data/RecentlyPlaylistData";
import { PlaylistData } from "./components/Data/PlaylistData";
import { AlbumData } from "./components/Data/AlbumData";

export const getSongDetail = (songId) => {
  return SongData.find((song) => song.id === songId);
};

export const getPlaylistDetail = (playlistId) => {
  return PlaylistData.find((playlist) => playlist.id === playlistId);
};

export const getAlbumDetail = (albumId) => {
  return AlbumData.find((album) => album.id === albumId);
};
