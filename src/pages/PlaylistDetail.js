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
import Popup from "reactjs-popup";
import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { changePlaylistName } from "../service";

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
  const [disabled, setDisabled] = useState(false);
  const name = useRef();
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
                <Popup
                  contentStyle={{
                    zIndex: "11",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "25%",
                  }}
                  onOpen={() => setDisabled(false)}
                  modal
                  nested
                  trigger={
                    <EditRounded
                      sx={{ marginLeft: "10px", cursor: "pointer" }}
                    />
                  }
                >
                  {(close) => (
                    <div className="modal">
                      <p
                        onClick={() => close()}
                        style={{
                          textAlign: "right",
                          marginRight: 5,
                          cursor: "pointer",
                        }}
                      >
                        X
                      </p>
                      <div className="content" style={{ textAlign: "center" }}>
                        <div>
                          <h2 style={{ marginBottom: "20px" }}>
                            Chỉnh sửa playlist
                          </h2>
                        </div>
                        <TextField
                          required
                          onChange={(e) => {
                            name.current.value = e.target.value;
                            if (name.current.value === "") setDisabled(true);
                            else setDisabled(false);
                          }}
                          inputRef={name}
                          placeholder="Nhập tên playlist"
                          defaultValue={playlistDetail.playlistName}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => {
                            changePlaylistName(
                              playlistDetail.id,
                              name.current.value
                            );
                            close();
                          }}
                          disabled={disabled}
                          sx={{
                            backgroundColor: "#ff7394",
                            ":hover": {
                              backgroundColor: "rgb(244, 161, 175)",
                            },
                          }}
                        >
                          Lưu
                        </Button>
                      </div>
                    </div>
                  )}
                </Popup>
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
                  <MoreHoriz />
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
