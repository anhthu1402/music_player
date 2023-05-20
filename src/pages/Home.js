import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BannerPlaylist from "../components/BannerPlaylist";
import RecentlyPlaylist from "../components/RecentlyPlaylist";
import TopTrendingArtist from "../components/TopTrendingArtist";
import "../styles/Home.css";
import MusicPlayerContext from "../MusicPlayerContext";
import { PlaylistData } from "../components/Data/PlaylistData";
import { AlbumData } from "../components/Data/AlbumData";
import HomePlaylistItem from "../components/Item/HomePlaylistItem";
import NewSongs from "../components/NewSongs";
import SongsChart from "../components/SongsChart";

function Home() {
  const song = useContext(MusicPlayerContext);
  return (
    <div className="container">
      <BannerPlaylist />

      <div className="categoryHeader">
        <p className="categoryTitle">Nghe gần đây</p>
        <Link className="linkToAllPlaylist" to={"/recently?type=playlist"}>
          <p>Tất cả &gt;</p>
        </Link>
      </div>
      <RecentlyPlaylist />

      <div className="categoryHeader">
        <p className="categoryTitle">Đề xuất cho bạn</p>
      </div>
      <div className="recommendationPlaylist">
        {PlaylistData.map(
          (item, key) =>
            key < 4 && (
              <div className="listPlaylists">
                <HomePlaylistItem key={key} item={item} />
              </div>
            )
        )}
      </div>

      <div className="categoryHeader">
        <p className="categoryTitle">Mới phát hành</p>
        <Link className="linkToAllPlaylist" to={"/newrelease?type=song"}>
          <p>Tất cả &gt;</p>
        </Link>
      </div>
      <NewSongs className="listNewSongs" />

      <div className="categoryHeader">
        <p className="categoryTitle">Nghệ sỹ thịnh hành</p>
      </div>
      <TopTrendingArtist />

      <div className="categoryHeader">
        <p className="categoryTitle">Album Hot</p>
      </div>
      <div className="albumHot">
        {AlbumData.map(
          (item, key) =>
            key < 4 && (
              <div className="listPlaylists">
                <HomePlaylistItem key={key} item={item} />
              </div>
            )
        )}
      </div>

      <div className="categoryHeader">
        <p className="categoryTitle">Top 100</p>
      </div>
      <div className="top100">
        {PlaylistData.map(
          (item, key) =>
            key < 4 && (
              <div className="listPlaylists">
                <HomePlaylistItem key={key} item={item} />
              </div>
            )
        )}
      </div>

      <div style={song.isUsing ? { height: "10em" } : { height: "3em" }}></div>
    </div>
  );
}

export default Home;
