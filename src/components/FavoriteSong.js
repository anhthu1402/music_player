import React, { useContext } from "react";
import { SongData } from "./Data/SongData";
import SongItem from "./Item/SongItem";
import TrackItem from "./Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";
import "../styles/FavoriteSong.css";
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
        <div className="song shadowDiv" key={index}>
          <TrackItem
            key={index}
            item={item}
            tracks={favTracks}
            song={song}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteSong;
