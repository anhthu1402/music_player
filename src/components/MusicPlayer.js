import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import {
  PauseRounded,
  PlayArrowRounded,
  FastForwardRounded,
  FastRewindRounded,
  VolumeDownRounded,
  VolumeUpRounded,
  ShuffleRounded,
  RepeatRounded,
  RepeatOneRounded,
  PlaylistPlay,
} from "@mui/icons-material";
import MusicPlayerContext from "../MusicPlayerContext";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/MusicPlayer.css";
import LocalPlaylistContext from "../LocalPlaylistContext";

const Widget = styled("div")(() => ({
  width: "100%",
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor: "white",
  boxShadow: `rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px`,

  // backdropFilter: "blur(40px)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const CoverImage = styled("div")({
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 5,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
  display: "flex",
  alignItems: "center",
});

const TinyText = styled(Typography)({
  fontSize: "1vw",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicPlayer = () => {
  const localPlaylist = useContext(LocalPlaylistContext);
  const musicPlayer = useContext(MusicPlayerContext);
  const tracks = musicPlayer.isUsing ? musicPlayer.tracks : [];
  const array =
    localStorage.getItem("playlist") !== null
      ? JSON.parse(localStorage.getItem("playlist"))
      : musicPlayer.playlist;
  const tracksLen = tracks.length;
  // 0: Phát theo trình tự, 1: Phát ngẫu nhiên
  const [playMode, setPlayMode] = useState(
    localStorage.getItem("playMode") === null
      ? 0
      : JSON.parse(localStorage.getItem("playMode"))
  );
  let index = musicPlayer.songIndex;
  let song = musicPlayer.isUsing ? array[index] : "";
  let songName = musicPlayer.isUsing ? array[index].songName : "";
  let representation = musicPlayer.isUsing ? array[index].representation : [];
  const audioRef = useRef();
  const [duration, setDuration] = useState(0); //seconds
  const [currentTime, setCurrentTime] = useState(musicPlayer.currentTime);
  const [play, setPlay] = useState(musicPlayer.play);
  let source = musicPlayer.isUsing ? array[index].songLink : "Aloha.mp3";
  let imgUrl = musicPlayer.isUsing ? array[index].songImage : "Logo.png";
  window.onbeforeunload = function () {
     if(song!==""){
      localStorage.setItem("song", JSON.stringify(song));
    }
    if(index!==0){
      localStorage.setItem("index", JSON.stringify(index));
    }
  };
  const handleLoadedData = () => {
    setDuration(Math.ceil(audioRef.current.duration));
    if (!musicPlayer.play) {
      audioRef.current.currentTime = musicPlayer.currentTime;
    }
    if (musicPlayer.play) {
      if (!play) {
        setPlay(true);
      }
      audioRef.current.play();
    }
  };
  const handlePausePlayClick = () => {
    if (play) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      if (!musicPlayer.play) {
        musicPlayer.setPlay(true);
        localStorage.setItem("play", true);
      }
      localStorage.setItem("play", true);
    }
    setPlay(!play);
  };
  const HandleTimeSliderChange = (x) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);
    if (!play) {
      setPlay(true);
      audioRef.current.play();
    }
  };
  function formatDuration(value) {
    value = Math.ceil(value);
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  const [repeat, setRepeat] = useState(0);
  const setNextIdx = () => {
    if (playMode === 3) {
      //setRnd(Math.floor(Math.random() * tracksLen));
      musicPlayer.setSongIndex((index + 1) % tracksLen);
      musicPlayer.setSong(song);
      localStorage.setItem("song", JSON.stringify(song));
      localStorage.setItem("index", JSON.stringify(musicPlayer.songIndex));
    } else {
      // Tạm xem phát lại tất cả như phát theo trình tự
      musicPlayer.setSongIndex((index + 1) % tracksLen);
      musicPlayer.setSong(song);
      localStorage.setItem("song", JSON.stringify(song));
      localStorage.setItem("index", JSON.stringify(musicPlayer.songIndex));
    }
    setPlay(true);
    audioRef.current.play();
    localStorage.setItem("currentTime", 0);
    musicPlayer.setCurrentTime(0);
  };
  const setPrevIdx = () => {
    if (playMode === 3) {
      //setRnd(Math.floor(Math.random() * tracksLen));
      musicPlayer.setSongIndex(index - 1 < 0 ? tracksLen - 1 : index - 1);
      musicPlayer.setSong(song);
      localStorage.setItem("song", JSON.stringify(song));
      localStorage.setItem("index", JSON.stringify(musicPlayer.songIndex));
    } else {
      // Tạm xem phát lại tất cả như phát theo trình tự
      musicPlayer.setSongIndex(index - 1 < 0 ? tracksLen - 1 : index - 1);
      musicPlayer.setSong(song);
      localStorage.setItem("song", JSON.stringify(song));
      localStorage.setItem("index", JSON.stringify(musicPlayer.songIndex));
    }
    setPlay(true);
    audioRef.current.play();
    localStorage.setItem("play", true);
    localStorage.setItem("currentTime", 0);
    musicPlayer.setCurrentTime(0);
  };
  const removeMusicplayer = () => {
    localStorage.removeItem("play");
    localStorage.removeItem("song");
    localStorage.removeItem("tracks");
    localStorage.removeItem("index");
    localStorage.removeItem("currentTime");
    musicPlayer.setUsing(false);
  };
  return (
    musicPlayer.isUsing && (
      <Box
        className="musicPlayerBox"
        style={musicPlayer.isUsing ? { display: "flex" } : { display: "none" }}
      >
        <audio
          ref={audioRef}
          src={source}
          onLoadedData={handleLoadedData}
          onTimeUpdate={() => {
            setCurrentTime(audioRef.current.currentTime);
            localStorage.setItem("currentTime", JSON.stringify(currentTime));
            musicPlayer.setCurrentTime(currentTime);
          }}
          onEnded={() => {
            if (repeat) {
              setPlay(true);
              audioRef.current.currentTime = 0;
              audioRef.current.play();
              localStorage.setItem("currentTime", 0);
              setCurrentTime(0);
            } else {
              musicPlayer.setSongIndex((index + 1) % tracksLen);
              musicPlayer.setSong(array[musicPlayer.songIndex]);
              localStorage.setItem("song", JSON.stringify(musicPlayer.song));
              localStorage.setItem(
                "index",
                JSON.stringify(musicPlayer.songIndex)
              );
            }
          }}
        />
        <Widget>
          <Box sx={{ display: `flex`, alignItems: "center" }}>
            <CoverImage
              sx={{
                width: "6vw",
                height: "6vw",
                minWidth: "40px",
                minHeight: "40px",
                margin: "10px",
                backgroundColor: "transparent",
              }}
            >
              <img
                alt={songName}
                src={imgUrl}
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  aspectRatio: 1,
                  objectFit: "cover",
                }}
              ></img>
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography
                className="trackPlayingName"
                noWrap
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.6vw",
                  width: "22vw",
                  marginBottom: "5px",
                }}
              >
                {songName}
              </Typography>
              <Typography
                className="songArtist"
                noWrap
                letterSpacing={-0.25}
                sx={{ display: `flex`, flexDirection: `row`, fontSize: "1vw" }}
              >
                {representation.map((child, index) => {
                  return (
                    <span key={index} item={child} className="artist">
                      <Link
                        to={`/artist/${child.artistName}`}
                        state={child}
                        color="grey"
                      >
                        {child.artistName}
                      </Link>
                    </span>
                  );
                })}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              width: "15vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100%",
              }}
            >
              <IconButton
                sx={{ margin: "0 0.5em" }}
                onClick={() => {
                  if (playMode === 1) {
                    setPlayMode(0);
                    localStorage.setItem("playMode", 0);
                    localStorage.setItem(
                      "playlist",
                      JSON.stringify(musicPlayer.playlist)
                    );
                  } else {
                    setPlayMode(1);
                    localStorage.setItem("playMode", 1);
                    localStorage.setItem(
                      "playlist",
                      JSON.stringify(shuffleArray(array))
                    );
                  }
                }}
              >
                <ShuffleRounded
                  sx={
                    playMode === 1
                      ? { color: "pink", fontSize: "1.5vw" }
                      : { color: "grey", fontSize: "1.5vw" }
                  }
                />
              </IconButton>
              <IconButton
                aria-label="previous song"
                onClick={() => {
                  setPrevIdx();
                }}
              >
                <FastRewindRounded sx={{ fontSize: "2.4vw" }} />
              </IconButton>
              <IconButton
                aria-label={play ? "play" : "pause"}
                onClick={handlePausePlayClick}
              >
                {!play ? (
                  <PlayArrowRounded sx={{ fontSize: "3vw" }} />
                ) : (
                  <PauseRounded sx={{ fontSize: "3vw" }} />
                )}
              </IconButton>
              <IconButton
                aria-label="next song"
                onClick={() => {
                  setNextIdx();
                }}
              >
                <FastForwardRounded sx={{ fontSize: "2.4vw" }} />
              </IconButton>
              <IconButton sx={{ margin: "0 0.5em" }}>
                <RepeatOneRounded
                  onClick={() => {
                    if (repeat === 1) {
                      setRepeat(0);
                    } else setRepeat(1);
                  }}
                  sx={repeat === 1 ? { color: "pink" } : { color: "grey" }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TinyText>
                <b>{formatDuration(currentTime)}</b>
              </TinyText>
              <Slider
                aria-label="time-indicator"
                size="small"
                value={currentTime}
                min={0}
                step={1}
                max={duration}
                onChange={(_, value) => HandleTimeSliderChange(value)}
                sx={{
                  color: "rgba(0,0,0,0.87)",
                  height: 4,
                  width: "28vw",
                  maxWidth: "100%",
                  margin: "0 10px",
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
              <TinyText>
                <b>-{formatDuration(duration - currentTime)}</b>
              </TinyText>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Tooltip title="Danh sách phát" placement="top">
                <Button
                  sx={{ mb: 0.1, color: "black" }}
                  onClick={() => {
                    localStorage.setItem(
                      "openLocalPlaylist",
                      !localPlaylist.open
                    );
                    localPlaylist.setOpen(!localPlaylist.open);
                  }}
                >
                  <PlaylistPlay
                    sx={
                      localPlaylist.open
                        ? { color: "pink" }
                        : { color: "black" }
                    }
                  />
                </Button>
              </Tooltip>
              <Button
                sx={{ mb: 0.1, color: "black" }}
                onClick={() => {
                  removeMusicplayer();
                  localStorage.setItem("openLocalPlaylist", false);
                  localPlaylist.setOpen(false);
                }}
              >
                X
              </Button>
            </div>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 0.1, px: 1, width: "13vw" }}
              alignItems="center"
            >
              <VolumeDownRounded />
              <Slider
                aria-label="Volume"
                defaultValue={40}
                sx={{
                  color: "rgba(0,0,0,0.87)",
                  width: 100,
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 13,
                    height: 13,
                    backgroundColor: "#fff",
                    "&:before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                }}
                onChange={(e) =>
                  (audioRef.current.volume = e.target.value / 100)
                }
              />
              <VolumeUpRounded />
            </Stack>
          </Box>
        </Widget>
      </Box>
    )
  );
};

export default MusicPlayer;
