import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PlayArrowRounded,
  MoreHoriz,
  FavoriteBorderOutlined,
  PlayCircle,
} from "@mui/icons-material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import "../styles/Album.css";
import MusicPlayerContext from "../MusicPlayerContext";
import TrackItem from "../components/Item/TrackItem";
import { getAlbumDetail } from "../service";

function Album() {
  const location = useLocation();
  const id = location.state;
  const albumDetail = getAlbumDetail(id);
  const tracks = albumDetail.songs;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const randomPlay = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
    song.setPlay(true);
    song.setPlaylist(tracks[rnd]);
    localStorage.setItem("song", JSON.stringify(tracks[rnd]));
    localStorage.setItem("tracks", JSON.stringify(tracks));
    localStorage.setItem("playlist", JSON.stringify(tracks));
    localStorage.setItem("index", JSON.stringify(rnd));
    localStorage.setItem("play", JSON.stringify(true));
    localStorage.setItem("currentTime", 0);
    song.setCurrentTime(0);
    song.setPlaylist(tracks);
  };
  function dateFormat(strDate) {
    const date = new Date(strDate);
    return date.toJSON().slice(0, 10).split("-").reverse().join("/");
  }
  return (
    <div className="albumDetailContainer">
      {albumDetail && (
        <div className="albumDetail">
          <div className="detail">
            <div className="trackImg">
              <img src={albumDetail.albumImage} alt={albumDetail.albumName} />
              <PlayCircle className="playIcon" onClick={randomPlay} />
            </div>
            <div className="albumInfo">
              <h1>{albumDetail.albumName}</h1>
              <p>Ngày phát hành: {dateFormat(albumDetail.releaseDate)}</p>
              <div className="artists">
                {albumDetail.artist.map((child, index) => (
                  <span key={index} item={child}>
                    <Link to={`/artist/${child.artistName}`} state={child}>
                      {child.artistName}
                    </Link>
                  </span>
                ))}
              </div>
              <p>{albumDetail.interestTimes} người yêu thích</p>
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
              <div class="song shadowDiv">
                <TrackItem
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
            style={song.isUsing ? { height: "8em" } : { height: "15px" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Album;
