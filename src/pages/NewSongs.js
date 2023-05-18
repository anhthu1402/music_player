import React, { useContext, useState } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { FavoriteBorderOutlined, MoreHoriz, PlayCircleFilledRounded } from "@mui/icons-material";
import TrackItem from "../components/Item/TrackItem";
import "../styles/PageNewSongs.css";
import NewSongsCountry from "../components/NewSongsCountry";
import {SongData} from '../components/Data/SongData';

function NewSongs() {
  // const player = useContext(MusicPlayerContext);
  // const [country, setCountry] = useState("all");
  const [toggleState, setToggleState] = useState(1);
  const tracksByCountry = [];
  SongData.map((item, index) => {
    if (toggleState === 1) {
      tracksByCountry.push(item);
    } 
    else if (toggleState === 2) {
      item.country.map((child) => {
        if (child.id === "1") {
          tracksByCountry.push(item);
        }
      });
    } 
    else if (toggleState === 3) {
      item.country.map((child) => {
        if (child.id === "3" || child.id === "4") {
          tracksByCountry.push(item);
        }
      });
    }
    else {
      item.country.map((child) => {
        if (child.id !== "1" && child.id !== "3" && child.id !== "4") {
          tracksByCountry.push(item);
        }
      });
    }
  });
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const tracks = tracksByCountry;
  const song = useContext(MusicPlayerContext);
  return (
    <div className="newSongReleaseContainer">
      <h1 className="newSongsHeader">Mới phát hành</h1>
      <div className="newSongsBtn">
        {/* <button
          className={country === "all" ? "active" : "inactive"}
          onClick={() => setCountry("all")}
        >
          Tất cả
        </button>
        <button
          className={country === "vietnam" ? "active" : "inactive"}
          onClick={() => setCountry("vietnam")}
        >
          Việt Nam
        </button>
        <button
          className={country === "other" ? "active" : "inactive"}
          onClick={() => setCountry("other")}
        >
          Quốc tế
        </button> */}
        <button className={toggleState === 1 ? 'active' : "inactive"}
          onClick={() => toggleTab(1)}>Tất cả</button>
        <button className={toggleState === 2 ? 'active' : "inactive"}
          onClick={() => toggleTab(2)}>Việt Nam</button>
        <button className={toggleState === 3 ? 'active' : "inactive"}
          onClick={() => toggleTab(3)}>US-UK</button>
        <button className={toggleState === 4 ? 'active' : "inactive"}
          onClick={() => toggleTab(4)}>Khác</button>
      </div>
      <div className="newSongsBodyHeading">
        <div>Bài hát</div>
        <div className="releaseDate">Phát hành</div>
        <div>Thời lượng</div>
      </div>
      <div className="newSongsBody">
        {tracksByCountry.map((item, key) => 
          <div class='track'>
            <TrackItem item={item} key={key} className='trackItem' />
            <div className='fauxImg'>
              <PlayCircleFilledRounded fontSize='large' className='icon' 
                onClick={() => {
                  song.setUsing(true);
                  song.setTracks(tracks);
                  song.setSongIndex(key);
                  song.setSong(tracks[key]);
                }} />
            </div>
            <div className="rightIcon">
              <FavoriteBorderOutlined fontSize='large' className="favOutlineIcon" />
              <MoreHoriz fontSize='large' className="moreHoriz" />
            </div>
            
          </div>
        )}
      </div>
      <div
          style={song.isUsing ? { height: "150px" } : { height: "10px" }}
        ></div>
    </div>
  );
}

export default NewSongs;
