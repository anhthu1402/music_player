import React from "react";
import PlaylistItem from "../components/Item/PlaylistItem";
import { PlaylistData } from "../components/Data/PlaylistData";

function RecentlyPlaylist() {
  return (
    <div className="myPlaylist">
      {PlaylistData.map((item, index) => (
        <PlaylistItem item={item} key={index} index={index} />
      ))}
    </div>
  );
}

export default RecentlyPlaylist;
