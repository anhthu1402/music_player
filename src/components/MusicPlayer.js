import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
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
} from "@mui/icons-material";
import MusicPlayerContext from "../MusicPlayerContext";
import { useRef } from "react";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "100%",
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
  display: "flex",
  alignItems: "center",
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicPlayer = () => {
  const musicPlayer = useContext(MusicPlayerContext);
  const tracks = musicPlayer.isUsing ? musicPlayer.tracks : [];
  const tracksLen = tracks.length;
  let index = musicPlayer.songIndex;
  let song = musicPlayer.isUsing ? tracks[index] : null;
  let title = musicPlayer.isUsing ? tracks[index].title : "";
  let artist = musicPlayer.isUsing ? song.artist : [];
  const getAudioSource = (source) => {
    return require("../assets/audio/" + source);
  };
  const getImgUrl = (url) => {
    return require("../assets/" + url);
  };
  const audioRef = useRef();
  const [duration, setDuration] = useState(0); //seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const source = musicPlayer.isUsing ? tracks[index].source : "Aloha.mp3";
  const imgUrl = musicPlayer.isUsing ? tracks[index].image : "Logo.png";
  const handleLoadedData = () => {
    setDuration(Math.ceil(audioRef.current.duration));
    if (isPlay) {
      audioRef.current.play();
    }
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const HandleTimeSliderChange = (x) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);
    if (!isPlay) {
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
  const theme = useTheme();

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  return (
    <Box
      style={musicPlayer.isUsing ? { display: "flex" } : { display: "none" }}
    >
      <audio
        ref={audioRef}
        src={getAudioSource(source)}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setPlay(false)}
      />
      <Widget>
        <Box sx={{ display: `flex`, alignItems: "center" }}>
          <CoverImage>
            <img alt="Only Love" src={getImgUrl(imgUrl)}></img>
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography noWrap>
              <b>{title}</b>
            </Typography>
            <Typography
              noWrap
              letterSpacing={-0.25}
              sx={{ display: `flex`, flexDirection: `row` }}
            >
              {artist.map((child, index) => {
                if (index < Object.keys(child).length - 1) {
                  return (
                    <div key={index} item={child} className="artist">
                      {child.name}
                    </div>
                  );
                } else
                  return (
                    <div key={index} item={child}>
                      , <span className="artist">{child.name}</span>
                    </div>
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <IconButton
              aria-label="previous song"
              onClick={() => {
                musicPlayer.setSongIndex(
                  index - 1 < 0 ? tracksLen - 1 : index - 1
                );
              }}
            >
              <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
            <IconButton
              aria-label={isPlay ? "play" : "pause"}
              onClick={handlePausePlayClick}
            >
              {!isPlay ? (
                <PlayArrowRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              )}
            </IconButton>
            <IconButton
              aria-label="next song"
              onClick={() => musicPlayer.setSongIndex((index + 1) % tracksLen)}
            >
              <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
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
                color:
                  theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                height: 4,
                width: 450,
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
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === "dark"
                        ? "rgb(255 255 255 / 16%)"
                        : "rgb(0 0 0 / 16%)"
                    }`,
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
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1, width: "fit-content" }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
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
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
};

export default MusicPlayer;
