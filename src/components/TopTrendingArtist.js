import React from 'react';
import { Link } from 'react-router-dom';
import { ArtistsData } from "../components/Data/ArtistsData";
import "../styles/TopTrendingArtist.css"

function TopTrendingArtist() {
    function getPlaylistImgUrl(url) {
        return require("../assets/" + url);
    }
    return (
        <div className='artists' style={{width: `100%`}}>
            {ArtistsData.map((item, index) => (
                <Link to={`/album/${item.id}`}>
                    <div key={index} className="artist">
                        <img src={getPlaylistImgUrl(`${item.image}`)} title={item.name}/>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default TopTrendingArtist
