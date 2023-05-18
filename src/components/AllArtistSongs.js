import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SongData } from "./Data/SongData";
import SongItem from "./Item/SongItem";
import MusicPlayerContext from "../MusicPlayerContext";

function AllArtistSongs() {
  const location = useLocation();
  const player = useContext(MusicPlayerContext);
  const artist = location.state;
  const tracks = SongData;
  const artistSongs = [];
  tracks.map((item, index) => {
    item.artist.map((child, key) => {
      if (child.id === artist.id) {
        artistSongs.push(item);
      }
    });
  });
  return (
    <div>
      <div className="aasHeader" style={{ marginBottom: 10 }}>
        <h2>{artist.artistName} - Tất cả bài hát</h2>
      </div>
      <div style={{ position: "relative" }}>
        {artistSongs.map((item, index) => (
          <SongItem
            key={index}
            item={item}
            tracks={artistSongs}
            song={player}
            index={0}
          />
        ))}
      </div>
    </div>
  );
}

export default AllArtistSongs;
