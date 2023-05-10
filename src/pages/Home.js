import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BannerPlaylist from "../components/BannerPlaylist";
import RecentlyPlaylist from "../components/RecentlyPlaylist";
import TopTrendingArtist from "../components/TopTrendingArtist";
import "../styles/Home.css";
import MusicPlayerContext from "../MusicPlayerContext";
import {PlaylistData} from '../components/Data/PlaylistData';
import HomePlaylistItem from "../components/Item/HomePlaylistItem";

function Home() {
  const song = useContext(MusicPlayerContext);
  return (
    <div className={song.isUsing ? "container active" : "container inactive"}>
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
      <div className='recommendationPlaylist'>
        {PlaylistData.map((item, key) => key < 4 && (
          <div className="listPlaylists">
            <HomePlaylistItem key={key} item={item}/>
          </div>
        ))}
      </div>

      <div className="categoryHeader">
        <p className="categoryTitle">Nghệ sỹ thịnh hành</p>
      </div>
      <TopTrendingArtist />

      <div className="categoryHeader">
        <p className="categoryTitle">Album Hot</p>
      </div>
      <div className='albumHot'>
        {PlaylistData.map((item, key) => key < 4 && (
          <div className="listPlaylists">
            <HomePlaylistItem key={key} item={item}/>
          </div>
        ))}
      </div>

      <div className="categoryHeader">
        <p className="categoryTitle">Top 100</p>
      </div>
      <div className='top100'>
        {PlaylistData.map((item, key) => key < 4 && (
          <div className="listPlaylists">
            <HomePlaylistItem key={key} item={item}/>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
