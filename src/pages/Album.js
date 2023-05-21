import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PlayArrowRounded,
  MoreHoriz,
  FavoriteBorderOutlined,
  PlayCircleFilledRounded,
  PlayCircle,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import "../styles/Album.css";
import TrackItem from "../components/Item/TrackItem";
import MusicPlayerContext from "../MusicPlayerContext";
import SongItem from "../components/Item/SongItem";

function Album() {
  const location = useLocation();
  const tracklist = location.state;
  const tracks = tracklist.albumTracks;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const randomPlay = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
  };
  function dateFormat(strDate) {
    const date = new Date(strDate);
    return date.toJSON().slice(0, 10).split("-").reverse().join("/");
  }
  return (
    <div className="albumDetailContainer">
      {tracklist && (
        <div className="albumDetail">
          <div className="detail">
            <div className="trackImg">
              <img src={tracklist.albumImage} alt={tracklist.albumName} />
              <PlayCircle className="playIcon" onClick={randomPlay} />
            </div>
            <div className="albumInfo">
              <h1>{tracklist.albumName}</h1>
              <p>Ngày phát hành: {dateFormat(tracklist.releaseDate)}</p>
              <div className="artists">
                {tracklist.artist.map((child, index) => (
                  <span key={index} item={child}>
                    <Link to={`/artist/${child.artistName}`} state={child}>
                      {child.artistName}
                    </Link>
                  </span>
                ))}
              </div>
              <p>{tracklist.interestTimes} người yêu thích</p>
              <button className="playButton" onClick={randomPlay}>
                <PlayArrowRounded /> Phát ngẫu nhiên
              </button>
              <FavoriteBorderOutlined className="favIcon" />
              <MoreHoriz className="moreIcon" />
            </div>
          </div>
          <div className="albumTracksBody">
            <div className="heading">
              <LibraryMusicIcon fontSize="small" />
              <div>Bài hát</div>
            </div>
            {tracks.map((item, key) => (
              // <div class="track">
              //   <TrackItem item={item} key={key} className="trackItem" />
              //   <div className="fauxImg">
              //     <PlayCircleFilledRounded
              //       fontSize="large"
              //       className="playIcon"
              //       onClick={() => {
              //         song.setUsing(true);
              //         song.setTracks(tracks);
              //         song.setSongIndex(key);
              //         song.setSong(tracks[key]);
              //       }}
              //     />
              //   </div>
              //   <div className="rightIcon">
              //     {item.isFavorite === 1 ? (
              //       <FavoriteBorderOutlined
              //         fontSize="large"
              //         className="favOutlineIcon"
              //       />
              //     ) : (
              //       <FavoriteIcon fontSize="large" className="favIcon" />
              //     )}
              //     <MoreHoriz fontSize="large" className="moreIcon" />
              //   </div>
              // </div>
              <div className="track">
                <SongItem
                  key={key}
                  item={item}
                  tracks={tracks}
                  song={song}
                  index={key}
                />
              </div>
            ))}
          </div>
          <div
            style={song.isUsing ? { height: "9em" } : { height: "15px" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Album;
