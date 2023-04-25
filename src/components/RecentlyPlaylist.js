import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/DiscoveryRecentlyPlaylist.css'
import { PlaylistData } from "./Data/PlaylistData";

function RecentlyPlaylist() {
    function getPlaylistImgUrl(url) {
        return require("../assets/" + url);
    }
    return (
        <div className='recentlyListen' style={{width: `100%`}}>
            {PlaylistData.map((item, index) => index < 3 && (
                <Link to={`/album/${item.id}`}>
                    <div key={index} className="playlistItem">
                        <img src={getPlaylistImgUrl(`${item.playlistImg}`)} className='imagePlaylist'/>
                        <p>{item.playlistName}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RecentlyPlaylist
