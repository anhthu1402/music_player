import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BannerPlaylist from "../components/BannerPlaylist";
import TopTrendingArtist from "../components/TopTrendingArtist";
import MusicPlayerContext from "../MusicPlayerContext";
import HomePlaylistItem from "../components/Item/HomePlaylistItem";
import NewSongs from "../components/NewSongs";
import NewSongRank from "../components/NewSongRank";
import { PlaylistData } from "../components/Data/PlaylistData";
import { AlbumData } from "../components/Data/AlbumData";
import "../styles/PlaylistAlbum.css";
import "../styles/Home.css";
import SidebarContext from "../SidebarContext";

function Home() {
  const song = useContext(MusicPlayerContext);
  const sidebar = useContext(SidebarContext);
  return (
    <div className="container">
      <BannerPlaylist />

      <div className="categoryHeader">
        <p className="categoryTitle">Nghe gần đây</p>
        <Link
          className="linkToAllPlaylist"
          to={"/recently?type=playlist"}
          onClick={() => {
            localStorage.setItem("sidebarPath", JSON.stringify("Gần đây"));
            sidebar.setPathName("Gần đây");
          }}
        >
          <p>Tất cả &gt;</p>
        </Link>
      </div>
      <div className="homeRecentlyPlaylist">
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
        <Link
          className="linkToAllPlaylist"
          to={"/newrelease?type=song"}
          onClick={() => {
            localStorage.setItem(
              "sidebarPath",
              JSON.stringify("Mới phát hành")
            );
            sidebar.setPathName("Mới phát hành");
          }}
        >
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
        <p className="categoryTitle">Bảng xếp hạng nhạc mới</p>
        <Link
          className="linkToAllPlaylist"
          to={"/charts"}
          onClick={() => {
            localStorage.setItem("sidebarPath", JSON.stringify("BXH"));
            sidebar.setPathName("BXH");
          }}
        >
          <p>Tất cả &gt;</p>
        </Link>
      </div>
      <NewSongRank className="newSongChart" />

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
