import React from "react";
import PlaylistItem from "./Item/PlaylistItem";
import { PlaylistData } from "./Data/PlaylistData";
import "../styles/MyPlaylist.css";

function MyPlaylist() {
  return (
    <div className="myPlaylist">
      {PlaylistData.map((item, index) => (
        <PlaylistItem item={item} key={index} />
      ))}
    </div>
  );
}

export default MyPlaylist;
