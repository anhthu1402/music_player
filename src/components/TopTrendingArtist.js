import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArtistsData } from "../components/Data/ArtistsData";
import "../styles/TopTrendingArtist.css";

function TopTrendingArtist() {
  function getPlaylistImgUrl(url) {
    return require(`../assets/` + url);
  }
  useEffect(() => {
    const handleWindowResize = () => {
      let topTrendingArtists = document.querySelector('.topTrendingArtists');
      let artist = topTrendingArtists.querySelectorAll('.artist');
      let width = topTrendingArtists.clientWidth;
      for (let i = 0; i < artist.length; i++) 
        artist[i].style.width = (width)/5 - 25 + "px";
    };
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <div className="topTrendingArtists" style={{ width: `100%` }}>
      {ArtistsData.map(
        (item, index) =>
          index < 5 && (
            <Link to={`/artist/${item.artistName}`} state={item}>
              <div key={index} className="artist">
                <img
                  src={item.artistImage}
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
