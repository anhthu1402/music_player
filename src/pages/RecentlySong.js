import React, { useContext } from "react";
import { SongData } from "../components/Data/SongData";
import SongItem from "../components/Item/SongItem";
import TrackItem from "../components/Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";
// import "../styles/MyRecently.css";
import "../styles/RecentlySong.css";

function RecentlySong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  return (
    <div className="recentlySongContainer" >
      {SongData.map((item, index) => (
        <div className="song shadowDiv">
          <TrackItem
            key={index}
            item={item}
            tracks={tracks}
            song={song}
            index={index}
          />
        </div>
      ))}
      <div style={song.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
}

export default RecentlySong;
