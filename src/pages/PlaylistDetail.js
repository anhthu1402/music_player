import React from "react";
import { useLocation } from "react-router-dom";
import {
  PlayArrowRounded,
  MoreHoriz,
  EditRounded,
  PlayCircle,
} from "@mui/icons-material";
import "../styles/PlaylistDetail.css";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { useState } from "react";
import TrackItem from "../components/Item/TrackItem";
import { getPlaylistDetail } from "../service";
import { useRef } from "react";
import NotificationContext from "../NotificationContext";
import ModifyPlaylist from "../components/ModifyPlaylist";
import PlaylistPopup from "../components/PlaylistPopup";
import { Tooltip } from "@mui/material";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const PlaylistDetail = () => {
  const location = useLocation();
  const playlistID = location.state;
  const playlistDetail = getPlaylistDetail(playlistID);
  const tracks = playlistDetail.songPlaylist;
  const song = useContext(MusicPlayerContext);
  const length = tracks.length;
  const [rnd, setRnd] = useState(0);
  const play = () => {
    setRnd(Math.floor(Math.random() * length));
    song.setUsing(true);
    song.setTracks(tracks);
    song.setSongIndex(rnd);
    song.setSong(tracks[rnd]);
    localStorage.setItem("currentTime", 0);
    song.setCurrentTime(0);
    song.setPlaylist(tracks);
    song.setPlay(true);
    localStorage.setItem("song", JSON.stringify(tracks[rnd]));
    localStorage.setItem("tracks", JSON.stringify(tracks));
    localStorage.setItem("index", JSON.stringify(rnd));
    localStorage.setItem("play", JSON.stringify(true));
    localStorage.setItem("playlist", JSON.stringify(tracks));
  };
  const modifyRef = useRef();
  const closeModifyPopup = () => modifyRef.current.close();
  const openModifyPopup = () => modifyRef.current.open();
  const popupRef = useRef();
  const closePopup = () => popupRef.current.close();
  const openPopup = () => popupRef.current.open();
  const notification = useContext(NotificationContext);
  const userId = 1;
  const downloadPlaylist = () => {
    const zip = new JSZip();
    playlistDetail.songPlaylist.map((item, index) => {
      var filename = item.songName + ".mp3";
      zip.file(filename, item.songLink, { binary: true });
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "uitmp3.zip");
    });
    // setTimeout(() => {
    //   notification.setUsing(true);
    //   notification.setContent("Đã tải " + length + " bài hát.");
    // }, 2000);
  };
  return (
    <div className="playlistDetailContainer">
      {playlistDetail && (
        <div className="playlistDetail">
          <div className="detail">
            <div className="playlistImg">
              <img
                src={playlistDetail.playlistImg}
                alt={playlistDetail.playlistName}
              />
              <PlayCircle className="playPlaylist" onClick={play} />
            </div>
            <div>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "2.2vw",
                }}
              >
                {playlistDetail.playlistName}
                <EditRounded
                  sx={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => {
                    if (userId === 1) {
                      openModifyPopup();
                    }
                  }}
                />
                <ModifyPlaylist
                  id={playlistDetail.id}
                  modifyRef={modifyRef}
                  name={playlistDetail.playlistName}
                  closeModifyPopup={closeModifyPopup}
                />
              </p>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "1.2vw",
                }}
              >
                Tạo bởi{" "}
                <span style={{ color: "grey", fontWeight: "bold" }}>
                  {playlistDetail.user}
                </span>
              </p>
              <div className="detailButton">
                <button className="playButton" onClick={play}>
                  <PlayArrowRounded sx={{ marginRight: "5px" }} />
                  Phát ngẫu nhiên
                </button>
                <button className="moreButton">
                  <Tooltip title="Khác">
                    <MoreHoriz onClick={openPopup} />
                  </Tooltip>
                  <PlaylistPopup
                    playlistDetail={playlistDetail}
                    length={length}
                    userId={userId}
                    popupRef={popupRef}
                    closePopup={closePopup}
                    downloadPlaylist={downloadPlaylist}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="songs">
            {tracks.map((item, index) => (
              <div className="song shadowDiv">
                <TrackItem
                  key={item.id}
                  item={item}
                  tracks={tracks}
                  song={song}
                  index={index}
                  notification={notification}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={song.isUsing ? { height: "9em" } : { height: "1em" }}></div>
    </div>
  );
};

export default PlaylistDetail;
