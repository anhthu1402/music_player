import React from "react";
import "../styles/TopRank.css";
import HomeAlbumItem from "../components/Item/HomeAlbumItem";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { AlbumData } from "../components/Data/AlbumData";

function TopRank() {
  const musicPlayer = useContext(MusicPlayerContext);
  return (
    <div className="top100Container">
      <h1 className="top100Heading">TOP 100</h1>
      <div className="top100Body">
        <div className="top100TitleGenre">Nổi bật</div>
        <div className="listTop100">
          {AlbumData.map((item, key) => (
            <div className="listPlaylists">
              <HomeAlbumItem key={key} item={item} />
            </div>
          ))}
        </div>
        <div className="top100TitleGenre">Nhạc Việt Nam</div>
        <div className="top100TitleGenre">Nhạc Châu Á</div>
        <div className="top100TitleGenre">Nhạc Âu Mỹ</div>
      </div>
      <div
        style={musicPlayer.isUsing ? { height: "8.5em" } : { height: "15px" }}
      ></div>
    </div>
  );
}

export default TopRank;
