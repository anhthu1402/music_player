import React, { useContext } from "react";
import { SongData } from "./Data/SongData";
import SongItem from "./Item/SongItem";
import MusicPlayerContext from "../MusicPlayerContext";

function FavoriteSong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  const favTracks = [];
  tracks.map((item, index) => {
    if (item.isFavorite === 1) {
      favTracks.push(item);
    }
  });
  return (
    <div
      className={"favSong"}
      style={{
        position: `relative`,
      }}
    >
      {favTracks.map((item, index) => (
        <SongItem
          key={index}
          item={item}
          tracks={favTracks}
          song={song}
          index={index}
        />
      ))}
    </div>
  );
}

export default FavoriteSong;
