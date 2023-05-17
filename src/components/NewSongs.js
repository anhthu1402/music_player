import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { FavoriteBorderOutlined, MoreHoriz, PlayCircleFilled } from "@mui/icons-material";
import TrackItem from './Item/TrackItem';
import {SongData} from './Data/SongData';
import '../styles/NewSongs.css';
function NewSongs() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);

  const [toggleState, setToggleState] = useState(1);
  const datas = [];
  const toggleTab = (index) => {
    setToggleState(index);
    if (index === 1) {
      datas = SongData.map();
    }
    if (index === 2) {

    }
  };

  // const [loading, setLoading] = useState(true);
  // const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/")
  //   .then(response => response.json())
  //   // .then(json => console.log(json))
  //   .then(data => setRecords(data))
  //   .catch(error => console.error(error));
  //   setLoading(false);
  // }, []);

  return (
    <div className='listSongContainer'>
      <div className='listSongHeader'>
        <div className={toggleState === 1 ? 'nation active' : "nation"}
          onClick={() => toggleTab(1)}>Tất cả</div>
        <div className={toggleState === 2 ? 'nation active' : "nation"}
          onClick={() => toggleTab(2)}>Việt Nam</div>
        <div className={toggleState === 3 ? 'nation active' : "nation"}
          onClick={() => toggleTab(3)}>US-UK</div>
        <div className={toggleState === 4 ? 'nation active' : "nation"}
          onClick={() => toggleTab(4)}>Châu Á</div>
        <div className={toggleState === 5 ? 'nation active' : "nation"}
          onClick={() => toggleTab(5)}>Khác</div>
      </div>
      <div className="listSongBody">
        {SongData.map((item, key) => item.countryId === 1 && key < 9 && 
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
    // <div>
    //   {loading ? "Loading..." : (
    //     <div>
    //       {records && records.map((item, key) => (
    //         <p>{item.title}</p>
    //       ))}
    //     </div>
    //   )}
    // </div>
  )
}

export default NewSongs
