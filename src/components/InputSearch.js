import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/InputSearch.css';
import { AlbumData } from './Data/AlbumData';
import { ArtistsData } from './Data/ArtistsData';
import axios from "axios";
import TrackItem from './Item/TrackItem';
import NotificationContext from "../NotificationContext";
import MusicPlayerContext from '../MusicPlayerContext';
function InputSearch() {
    const song = useContext(MusicPlayerContext);
    const notification=useContext(NotificationContext);
    const [searchTerm, setSearchTerm] = useState("");
    const rsSong = [], playlist = [], rsArtist = [], rsAlbum = [];
    if (searchTerm !== '') {
        AlbumData.map((value) => {
            value.songs.map((val, key) => {
                if (val.songName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    rsSong.push(val);
                    playlist.push(value);
                }
            })
        });
        ArtistsData.map((val) => {
            if (val.artistName.toLowerCase().includes(searchTerm.toLowerCase())) {
                rsArtist.push(val);
            }
        });
        AlbumData.map((val) => {
            if (val.albumName.toLowerCase().includes(searchTerm.toLowerCase())) {
                rsAlbum.push(val)
            }
        });
    }
    
    return (
        <div className='inputSearchContainer'>
            <div class="nosubmit">
                <input class="nosubmit" type="search" 
                        placeholder="Tìm kiếm tên bài hát, nghệ sĩ, ..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                        onkeydown="return event.key != 'Enter';" />
            </div>
            <div className={searchTerm !== "" ? 'resultSearch' : 'hideRS'}>
                {/* <div id='headingSearchSong'>Bài hát</div>
                <div className='rs_songs'>
                    {AlbumData.map((value) => {
                        value.songs.map((val, key) => {
                            if (val.songName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return (
                                    <div className="song">
                                        <TrackItem
                                            key={key}
                                            item={val}
                                            tracks={value.songs}
                                            index={key}
                                            song={song} 
                                            notification={notification}
                                        />
                                    </div>
                                
                                );
                            }
                        })}
                    )}
                </div> */}
                {rsSong === null ? '' : 
                `<><div id='headingSearchSong'>Bài hát</div>
                <div className='rs_songs'>
                    rsSong.map((val, key) => {
                        return (
                            <div className="song">
                                <TrackItem
                                    key={key}
                                    item={val}
                                    tracks={playlist.songs}
                                    index={key}
                                    song={song} 
                                    notification={notification}
                                />
                            </div>
                        )
                    })
                    </div></>`
                }
                <div id='headingSearchArtist'>Nghệ sỹ</div>
                <div className='artistsResult'>
                    {ArtistsData.map((val) => {
                        if (val.artistName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return (
                                <div className="artistResult">
                                    <img src={val.artistImage} alt={val.artistName} />
                                    <div className='result-details'>
                                        <p><Link to={`/artist/${val.artistName}`} state={val}>{val.artistName}</Link></p>
                                        <p>{val.numberOfFollower}</p>
                                    </div>
                                </div>
                            );
                        }
                        })
                    }
                </div>
                <div id='headingSearchAlbum'>Album</div>
                <div className='albumsResult'>
                    {AlbumData.map((val) => {
                        if (val.albumName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return (
                                <div className="albumResult">
                                    <img src={val.albumImage} alt={val.albumName} />
                                    <p className='rs_albumName'><Link to={`/album/${val.albumName}`} state={val.id}>{val.albumName}</Link></p>
                                </div>
                            );
                        }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default InputSearch
