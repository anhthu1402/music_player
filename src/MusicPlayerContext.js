import React, { createContext, useState } from "react";
const MusicPlayerContext = createContext();
export const MusicPlayerProvider = ({ children }) => {
  const [isUsing, setUsing] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [song, setSong] = useState("");
  const [songIndex, setSongIndex] = useState(0);
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
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
export default MusicPlayerContext;
