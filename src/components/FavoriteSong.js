import React from "react";
import { SongData } from "./Data/SongData";
import SongItem from "./Item/SongItem";

function FavoriteSong() {
  return (
    <div>
      {SongData.map((item, index) => {
        if (item.isFavorite === 1) {
          return <SongItem key={index} item={item} />;
        }
      })}
    </div>
  );
}

export default FavoriteSong;
