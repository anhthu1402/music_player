import React, { useContext } from "react";
import PlaylistItem from "../components/Item/PlaylistItem";
import MusicPlayerContext from "../MusicPlayerContext";
import { RecentlyPlaylistData } from "../components/Data/RecentlyPlaylistData";

function RecentlyPlaylist() {
  const song = useContext(MusicPlayerContext);
  return (
    <div
      className={
        song.isUsing
          ? "myPlaylist recently active"
          : "myPlaylist recently inactive"
      }
    >
      {RecentlyPlaylistData.map((item, index) => (
        <PlaylistItem item={item} key={index} />
      ))}
    </div>
  );
}

export default RecentlyPlaylist;
