import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SongData } from "./Data/SongData";
import TrackItem from "./Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";

function AllArtistSongs() {
  const location = useLocation();
  const player = useContext(MusicPlayerContext);
  const artist = location.state.artist;
  const songs = location.state.songs;
  return (
    <div>
      <div className="aasHeader" style={{ marginBottom: 10 }}>
        <h2>{artist.artistName} - Tất cả bài hát</h2>
      </div>
      <div>
        {songs.map((item, index) => (
          <div className="song shadowDiv">
            <TrackItem
              key={index}
              item={item}
              tracks={songs}
              song={player}
              index={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllArtistSongs;
