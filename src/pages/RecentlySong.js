import React from "react";
import { SongData } from "../components/Data/SongData";
import SongItem from "../components/Item/SongItem";

function RecentlySong() {
  return (
    <div>
      {SongData.map((item, index) => (
        <SongItem key={index} item={item} />
      ))}
    </div>
  );
}

export default RecentlySong;
