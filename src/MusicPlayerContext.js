import React, { createContext, useState } from "react";
const MusicPlayerContext = createContext();
export const MusicPlayerProvider = ({ children }) => {
  const [isUsing, setUsing] = useState(localStorage.getItem("song") !== null);
  const [tracks, setTracks] = useState(
    JSON.parse(localStorage.getItem("tracks")) || []
  );
  const [song, setSong] = useState(
    JSON.parse(localStorage.getItem("song")) || ""
  );
  const [songIndex, setSongIndex] = useState(
    JSON.parse(localStorage.getItem("index")) || 0
  );
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem("tracks")) || []
  );
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    JSON.parse(localStorage.getItem("currentTime")) || 0
  );
  return (
    <MusicPlayerContext.Provider
      value={{
        isUsing,
        tracks,
        setUsing,
        setTracks,
        song,
        setSong,
        songIndex,
        setSongIndex,
        playlist,
        setPlaylist,
        play,
        setPlay,
        currentTime,
        setCurrentTime,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
export default MusicPlayerContext;
