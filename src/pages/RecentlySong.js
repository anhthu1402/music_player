import React, { useContext } from "react";
import { SongData } from "../components/Data/SongData";
import SongItem from "../components/Item/SongItem";
import MusicPlayerContext from "../MusicPlayerContext";
import "../styles/MyRecently.css";

function RecentlySong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  return (
    <div
      style={{
        position: `relative`,
        marginBottom: "7em",
      }}
    >
      {SongData.map((item, index) => (
        <div>
          <SongItem
            key={index}
            item={item}
            tracks={tracks}
            song={song}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default RecentlySong;
