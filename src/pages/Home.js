import React from "react";
import { Link } from 'react-router-dom';
import BannerPlaylist from "../components/BannerPlaylist";
import RecentlyPlaylist from "../components/RecentlyPlaylist";
import TopTrendingArtist from "../components/TopTrendingArtist";
import MusicPlayer from "../components/MusicPlayer";
import '../styles/Home.css'
import RecentlyListen from "./RecentlyListen";

function Home() {
  return (
    <div className="container">
      <BannerPlaylist />

      <div className='categoryHeader'>
        <p className="categoryTitle">Nghe gần đây</p>
        <Link className='linkToAllPlaylist' to={"/recently?type=song"}>
            <p>Tất cả &gt;</p>
        </Link>
      </div>
      <RecentlyPlaylist />

      <div className='categoryHeader'>
        <p className="categoryTitle">Nghệ sỹ thịnh hành</p>
      </div>
      <TopTrendingArtist />
      {/* RecentlyListen là trang ta dùng để nháp trc khi tạo page ms thoi á. mốt xóa. */}
      {/* <RecentlyListen /> */}
      <MusicPlayer />
    </div>
  );
}

export default Home;
