import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BannerPlaylist from "../components/BannerPlaylist";
import TopTrendingArtist from "../components/TopTrendingArtist";
import MusicPlayerContext from "../MusicPlayerContext";
import HomePlaylistItem from "../components/Item/HomePlaylistItem";
import NewSongs from "../components/NewSongs";
import NewSongRank from "../components/NewSongRank";
import { PlaylistData } from "../components/Data/PlaylistData";
import "../styles/PlaylistAlbum.css";
import "../styles/Home.css";
import SidebarContext from "../SidebarContext";
import HomeAlbumItem from "../components/Item/HomeAlbumItem";
import { AlbumData } from "../components/Data/AlbumData";
import { RecentlyPlaylistData } from "../components/Data/RecentlyPlaylistData";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

function Home() {
  const song = useContext(MusicPlayerContext);
  const sidebar = useContext(SidebarContext);
  const recommendationPlaylist = [];
  PlaylistData.map((item) => {
    if (item.user !== "Anh Thư") {
      recommendationPlaylist.push(item);
    }
  });
  const { isAuthed } = useSelector((state) => state.auth);
  return (
    <div className="container">
      <BannerPlaylist />

      {isAuthed ? (
        <div>
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
            {RecentlyPlaylistData.map(
              (item, key) =>
                key < 4 && (
                  <div className="listPlaylists">
                    <Tooltip title={item.playlistName}>
                      <HomePlaylistItem key={key} item={item} />
                    </Tooltip>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="categoryHeader">
        <p className="categoryTitle">Đề xuất cho bạn</p>
      </div>
      <div className="recommendationPlaylist">
        {recommendationPlaylist.map(
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
        <Link
          className="linkToAllPlaylist"
          to={"/topalbum"}
          onClick={() => {
            localStorage.setItem("sidebarPath", JSON.stringify("Top album"));
            sidebar.setPathName("Top album");
          }}
        >
          <p>Tất cả &gt;</p>
        </Link>
      </div>
      <div className="albumHot">
        {AlbumData.map(
          (item, key) =>
            key < 4 && (
              <div className="listPlaylists">
                <HomeAlbumItem key={key} item={item} />
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

      {/* <div className="categoryHeader">
        <p className="categoryTitle">Top 100</p>
      </div>
      <div className="top100">
        {AlbumData.map(
          (item, key) =>
            key < 8 &&
            key % 2 === 0 && (
              <div className="listPlaylists">
                <HomeAlbumItem key={key} item={item} />
              </div>
            )
        )}
      </div> */}

      <div style={song.isUsing ? { height: "10em" } : { height: "3em" }}></div>
    </div>
  );
}

export default Home;
