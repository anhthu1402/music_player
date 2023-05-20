import React, { useContext } from "react";
import { SongData } from "./Data/SongData";
import SongItem from "./Item/SongItem";
import TrackItem from "./Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayCircleFilledRounded,
} from "@mui/icons-material";
import "../styles/FavoriteSong.css";
function FavoriteSong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  const favTracks = [];
  tracks.map((item, index) => {
    if (item.isFavorite === 1) {
      favTracks.push(item);
    }
  });
  return (
    <div
      className={"favSong"}
      style={{
        position: `relative`,
      }}
    >
      {favTracks.map((item, index) => (
        <div class='track'>
          <TrackItem  key={index}
                      item={item}
                      // tracks={favTracks}
                      // song={song}
                      index={index}
                      className='trackItem' />
          <div className='fauxImg'>
            <PlayCircleFilledRounded fontSize='large' className='icon' 
              onClick={() => {
                song.setUsing(true);
                song.setTracks(favTracks);
                song.setSongIndex(index);
                song.setSong(favTracks[index]);
              }} />
          </div>
          <div className="rightIcon">
            {
              item.isFavorite === 0 
              ? <FavoriteBorderOutlined fontSize='large' className="favOutlineIcon" /> 
              : <FavoriteIcon fontSize="large" className="favIcon" />
            }
            <MoreHoriz fontSize='large' className="moreHoriz" />
            </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteSong;
