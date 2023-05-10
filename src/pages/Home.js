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
            <div className="artists">
              {item.playlistSongs.map((item2, key2) => (
                <span>
                  {item2.artist.map((child, index) => {
                    return (
                      <span key={index} item={child} className="artist">
                        <Link to={`/artist/${child.name}`} state={child}>{child.name}</Link>
                      </span>
                    );
                  })}
                </span>
              ))}
             </div>
          </div>
        ))}
      </div>

      <div className="categoryHeader">
        <p className="categoryTitle">Nghệ sỹ thịnh hành</p>
      </div>
      <TopTrendingArtist />

    </div>
  );
}

export default Home;
