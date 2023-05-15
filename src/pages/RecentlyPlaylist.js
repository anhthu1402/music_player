import React, { useContext } from "react";
import PlaylistItem from "../components/Item/PlaylistItem";
import MusicPlayerContext from "../MusicPlayerContext";
import { RecentlyPlaylistData } from "../components/Data/RecentlyPlaylistData";

function RecentlyPlaylist() {
  const song = useContext(MusicPlayerContext);
  return (
    <div>
      <div className="myPlaylist recently">
        {RecentlyPlaylistData.map((item, index) => (
          <PlaylistItem item={item} key={index} />
        ))}
      </div>
      <div style={song.isUsing ? { height: "8em" } : { height: "1em" }}></div>
    </div>
  );
}

export default RecentlyPlaylist;
