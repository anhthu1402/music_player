import React, { useState, useContext } from 'react'
import Carousel from 'react-simply-carousel';
import TrackItem from './Item/TrackItem';
import { SongData } from './Data/SongData';
import { PlayCircleFilled } from "@mui/icons-material";
import MusicPlayerContext from '../MusicPlayerContext';
import "../styles/NewSongRank.css";

function NewSongRank() {
    const [activeSlide, setActiveSlide] = useState(0);
    const tracks = SongData;
    const song = useContext(MusicPlayerContext);
    return (
        <div className='newSongRankContainer'>
            <div class='trackList'>
                {SongData.map((item, key) => key < 8 && 
                    <div className='track'>
                        <TrackItem item={item} key={key} className='trackItem' />
                        <div className='fauxImg'>
                            <PlayCircleFilled fontSize='large' className='icon' 
                                onClick={() => {
                                song.setUsing(true);
                                song.setTracks(tracks);
                                song.setSongIndex(key);
                                song.setSong(tracks[key]);
                                }} />
                        </div>
                        <div className='ordinalNum'>#{key+1}</div>
                    </div>
                )}
            </div>
            <button className='btnBack'>{`<`}</button>
            <button className='btnForw'>{`>`}</button>
        </div>
    )
}

export default NewSongRank
