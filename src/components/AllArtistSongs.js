import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import TrackItem from "./Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";
import NotificationContext from "../NotificationContext";

function AllArtistSongs() {
  const location = useLocation();
  const player = useContext(MusicPlayerContext);
  const artist = location.state.artist;
  const songs = location.state.songs;
  const notification = useContext(NotificationContext);
  return (
    <div>
      <div>
        <div className="aasHeader" style={{ marginBottom: 10 }}>
          <h2>{artist.artistName} - Tất cả bài hát</h2>
        </div>
        <div>
          {songs.map((item, index) => (
            <div className="song shadowDiv" key={index}>
              <TrackItem
                key={index}
                item={item}
                tracks={songs}
                song={player}
                index={index}
                notification={notification}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={player.isUsing ? { height: "8em" } : { height: "2em" }}></div>
    </div>
  );
}

export default AllArtistSongs;
