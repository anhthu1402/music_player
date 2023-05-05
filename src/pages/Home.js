import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BannerPlaylist from "../components/BannerPlaylist";
import RecentlyPlaylist from "../components/RecentlyPlaylist";
import TopTrendingArtist from "../components/TopTrendingArtist";
import "../styles/Home.css";
import MusicPlayerContext from "../MusicPlayerContext";

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
        <p className="categoryTitle">Nghệ sỹ thịnh hành</p>
      </div>
      <TopTrendingArtist />
      {/* RecentlyListen là trang ta dùng để nháp trc khi tạo page ms thoi á. mốt xóa. */}
      {/* <RecentlyListen /> */}
    </div>
  );
}

export default Home;
