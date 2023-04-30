import React from "react";
import { useLocation } from "react-router-dom";
import {
  PlayArrowRounded,
  MoreHoriz,
  EditRounded,
  PlayCircle,
} from "@mui/icons-material";
import "../styles/PlaylistDetail.css";
import SongItem from "../components/Item/SongItem";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";

const PlaylistDetail = () => {
  const location = useLocation();
  const playlist = location.state;
  const tracks = playlist.playlistSongs;
  const song = useContext(MusicPlayerContext);
  return (
    <div>
      {playlist && (
        <div className="playlistDetail">
          <div className="detail">
            <div className="playlistImg">
              <img
                src={require(`../assets/${playlist.playlistImg}`)}
                alt={playlist.playlistName}
                width="350px"
              />
              <PlayCircle className="playPlaylist" />
            </div>
            <h1 style={{ margin: "20px" }}>
              {playlist.playlistName}
              <EditRounded sx={{ marginLeft: "10px" }} />
            </h1>
            <button className="playButton">
              <PlayArrowRounded sx={{ marginRight: "5px" }} />
              Phát ngẫu nhiên
            </button>
            <button className="moreButton">
              <MoreHoriz />
            </button>
          </div>
          <div className="songs">
            {playlist.playlistSongs.map((item, index) => (
              <SongItem
                key={index}
                item={item}
                tracks={tracks}
                song={song}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;
