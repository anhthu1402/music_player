import React from "react";
import { Link } from "react-router-dom";
import "../styles/DiscoveryRecentlyPlaylist.css";
import { PlaylistData } from "./Data/PlaylistData";

function RecentlyPlaylist() {
  function getPlaylistImgUrl(url) {
    return require("../assets/" + url);
  }
  return (
    <div className="recentlyListen" style={{ width: `100%` }}>
      {PlaylistData.map(
        (item, index) =>
          index < 4 && (
            <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
              <div key={index} className="playlistItem">
                <img
                  src={getPlaylistImgUrl(`${item.playlistImg}`)}
                  className="imagePlaylist"
                  alt={item.playlistName}
                />
                <p>{item.playlistName}</p>
              </div>
            </Link>
          )
      )}
    </div>
  );
}

export default RecentlyPlaylist;
