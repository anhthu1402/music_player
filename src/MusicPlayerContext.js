import React, { createContext, useState } from "react";
const MusicPlayerContext = createContext();
export const MusicPlayerProvider = ({ children }) => {
  const [isUsing, setUsing] = useState(
    localStorage.getItem("song") === null ? false : true
  );
  const [tracks, setTracks] = useState(
    localStorage.getItem("tracks") !== null
      ? JSON.parse(localStorage.getItem("tracks"))
      : []
  );
  const [song, setSong] = useState(
    localStorage.getItem("song") !== null
      ? JSON.parse(localStorage.getItem("song"))
      : ""
  );
  const [songIndex, setSongIndex] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("index"))
      : 0
  );
  const [playlist, setPlaylist] = useState(
    localStorage.getItem("tracks") !== null
      ? JSON.parse(localStorage.getItem("tracks"))
      : []
  );
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    localStorage.getItem("currentTime") !== null
      ? JSON.parse(localStorage.getItem("currentTime"))
      : 0
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
