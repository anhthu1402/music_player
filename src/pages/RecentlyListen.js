import React from 'react';
import { Link } from 'react-router-dom';
import { ArtistsData } from "../components/Data/ArtistsData";
import "../styles/DiscoveryRecentlyPlaylist.css"

function RecentlyListen() {
    function getPlaylistImgUrl(url) {
        return require("../assets/" + url);
    }
    return (
        <div className='recentlyListen' style={{width: `100%`}}>
            {ArtistsData.map((item, index) => index < 3 && (
                <Link to={`/album/${item.id}`}>
                    <div key={index} className="playlistItem">
                        <img src={getPlaylistImgUrl(`${item.image}`)} title={item.name} className='imagePlaylist'/>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RecentlyListen
