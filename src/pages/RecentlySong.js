import React, { useContext } from "react";
import { SongData } from "../components/Data/SongData";
import TrackItem from "../components/Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";
// import "../styles/MyRecently.css";
import "../styles/RecentlySong.css";
import NotificationContext from "../NotificationContext";

function RecentlySong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  const notification = useContext(NotificationContext);
  return (
    <div className="recentlySongContainer">
      {SongData.map((item, index) => (
        <div className="song shadowDiv">
          <TrackItem
            key={item.id}
            item={item}
            tracks={tracks}
            song={song}
            index={index}
            notification={notification}
          />
        </div>
      ))}
      <div style={song.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
}

export default RecentlySong;
