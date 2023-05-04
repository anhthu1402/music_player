import React, { useContext } from "react";
import PlaylistItem from "../components/Item/PlaylistItem";
import { PlaylistData } from "../components/Data/PlaylistData";
import MusicPlayerContext from "../MusicPlayerContext";

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
      {PlaylistData.map((item, index) => (
        <PlaylistItem item={item} key={index} index={index} />
      ))}
    </div>
  );
}

export default RecentlyPlaylist;
