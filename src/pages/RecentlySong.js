import React, { useContext } from "react";
import { SongData } from "../components/Data/SongData";
import SongItem from "../components/Item/SongItem";
import MusicPlayerContext from "../MusicPlayerContext";

function RecentlySong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  return (
    <div>
      <div
        style={{
          height: `calc(100%-18vh)`,
          position: `relative`,
          marginBottom: `18vh`,
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
    </div>
  );
}

export default RecentlySong;
