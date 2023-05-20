import React, { useContext } from "react";
import { SongData } from "../components/Data/SongData";
import SongItem from "../components/Item/SongItem";
import TrackItem from "../components/Item/TrackItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayCircleFilledRounded,
} from "@mui/icons-material";
import MusicPlayerContext from "../MusicPlayerContext";
import "../styles/MyRecently.css";
import "../styles/RecentlySong.css";

function RecentlySong() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);
  return (
    <div
      style={{
        position: `relative`,
      }}
      className="recentlySongContainer"
    >
      {SongData.map((item, index) => (
        // <div>
        //   <SongItem
        //     key={index}
        //     item={item}
        //     tracks={tracks}
        //     song={song}
        //     index={index}
        //   />
        // </div>
        <div class='track'>
          <TrackItem key={index} item={item} className='trackItem' />
          <div className='fauxImg'>
            <PlayCircleFilledRounded fontSize='large' className='icon' 
              onClick={() => {
                song.setUsing(true);
                song.setTracks(tracks);
                song.setSongIndex(index);
                song.setSong(tracks[index]);
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
      <div style={song.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
}

export default RecentlySong;
