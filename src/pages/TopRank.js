import React from "react";
import "../styles/TopRank.css";
import { getAllAlbum } from "../components/API/getAllAlbums";
import HomeAlbumItem from "../components/Item/HomeAlbumItem";

function TopRank() {
  return (
    <div className="top100Container">
      <h1 className="top100Heading">TOP 100</h1>
      <div className="top100Body">
        <div className="top100TitleGenre">Nổi bật</div>
        <div className="listTop100">
          {getAllAlbum.map((item, key) => (
            <div className="listPlaylists">
              <HomeAlbumItem key={key} item={item} />
            </div>
          ))}
        </div>
        <div className="top100TitleGenre">Nhạc Việt Nam</div>
        <div className="top100TitleGenre">Nhạc Châu Á</div>
        <div className="top100TitleGenre">Nhạc Âu Mỹ</div>
      </div>
    </div>
  );
}

export default TopRank;
