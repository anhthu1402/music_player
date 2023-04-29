import React, { useContext } from "react";
import { SongData } from "./Data/SongData";
import SongItem from "./Item/SongItem";
import MusicPlayerContext from "../MusicPlayerContext";
import { useState } from "react";
import { useEffect } from "react";

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
      style={{
        height: `calc(100%-18vh)`,
        position: `relative`,
        marginBottom: `18vh`,
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
