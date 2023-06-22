import React from "react";
import "../styles/TopRank.css";
import HomeAlbumItem from "../components/Item/HomeAlbumItem";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { AlbumData } from "../components/Data/AlbumData";

function TopRank() {
  const musicPlayer = useContext(MusicPlayerContext);
  const albumsVietNam = [];
  const albumsAsia = [];
  const albumsUSUK = [];
  AlbumData.map((item) => {
    item.country.map((child) => {
      if (child.id === 1) {
        albumsVietNam.push(item);
        albumsAsia.push(item);
      } else if (child.id === 2 || child.id === 3) {
        albumsAsia.push(item);
      } else if (child.id === 4) {
        albumsUSUK.push(item);
      }
    });
  });
  return (
    <div className="top100Container">
      <h1 className="top100Heading">TOP ALBUM</h1>
      <div className="top100Body">
        {/* <div className="top100TitleGenre">Nổi bật</div>
        <div className="listTop100">
          {AlbumData.map((item, key) => (
            <div className="listPlaylists">
              <HomeAlbumItem key={key} item={item} />
            </div>
          ))}
        </div> */}
        <div className="top100TitleGenre">Nhạc Việt Nam</div>
        <div className="listTop100">
          {albumsVietNam.map((item, key) => (
            <div className="listPlaylists">
              <HomeAlbumItem key={key} item={item} />
            </div>
          ))}
        </div>
        <div className="top100TitleGenre">Nhạc Âu Mỹ</div>
        <div className="listTop100">
          {albumsUSUK.map((item, key) => (
            <div className="listPlaylists">
              <HomeAlbumItem key={key} item={item} />
            </div>
          ))}
        </div>
        <div className="top100TitleGenre">Nhạc Châu Á</div>
        <div className="listTop100">
          {albumsAsia.map((item, key) => (
            <div className="listPlaylists">
              <HomeAlbumItem key={key} item={item} />
            </div>
          ))}
        </div>
      </div>
      <div
        style={musicPlayer.isUsing ? { height: "8.5em" } : { height: "15px" }}
      ></div>
    </div>
  );
}

export default TopRank;
