import React, { useState } from 'react';
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { FavoriteBorderOutlined, MoreHoriz, PlayCircleFilled } from "@mui/icons-material";
import TrackItem from './Item/TrackItem';
import {SongData} from './Data/SongData';
import '../styles/NewSongs.css';
function NewSongs() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  const [params, setParams] = useState(false);

  const handleChangeTab = () => {
    setParams(!params);
  };
  return (
    <div className='listSongContainer'>
      <div className='listSongHeader'>
        <div className='nation active'>Tất cả</div>
        <div className='nation'>Việt Nam</div>
        <div className='nation'>US-UK</div>
        <div className='nation'>Châu Á</div>
        <div className='nation'>Khác</div>
      </div>
      <div className="listSongBody">
        {SongData.map((item, key) => key < 9 && 
          <div class='track'>
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
            
          </div>
        )}
      </div>
      
    </div>
  )
}

export default NewSongs
