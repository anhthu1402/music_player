import React from "react";
import { Link } from "react-router-dom";
import { ArtistsData } from "../components/Data/ArtistsData";
import "../styles/TopTrendingArtist.css";

function TopTrendingArtist() {
  function getPlaylistImgUrl(url) {
    return require("../assets/" + url);
  }
  return (
    <div className="topTrendingArtists" style={{ width: `100%` }}>
      {ArtistsData.map(
        (item, index) =>
          index < 5 && (
            <Link to={`/artist/${item.artistName}`} state={item}>
              <div key={index} className="artist">
                <img
                  src={getPlaylistImgUrl(`${item.artistImage}`)}
                  title={item.artistName}
                  alt={item.artistName}
                />
              </div>
            </Link>
          )
      )}
    </div>
  );
}

export default TopTrendingArtist;
