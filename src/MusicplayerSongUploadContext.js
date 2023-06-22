import React, { createContext, useState } from "react";
const MusicPlayerSongUploadContext = createContext();
export const MusicPlayerSongUploadProvider = ({ children }) => {
  const [isUsingUpload, setUsingUpload] = useState(
    localStorage.getItem("isUsing") === null ? false : true
  );
  const [songName, setSongName] = useState(
    localStorage.getItem("songName") !== null
      ? JSON.parse(localStorage.getItem("songName"))
      : ""
  );
  const [songImage, setSongImage] = useState(
    localStorage.getItem("songImage") !== null
      ? JSON.parse(localStorage.getItem("songImage"))
      : ""
  );
  const [songLink, setSongLink] = useState(
    localStorage.getItem("songLink") !== null
      ? JSON.parse(localStorage.getItem("songLink"))
      : 0
  );
  const [representation, setRepresentation] = useState(
    localStorage.getItem("representation") !== null
      ? JSON.parse(localStorage.getItem("representation"))
      : []
  );
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    localStorage.getItem("currentTime") !== null
      ? JSON.parse(localStorage.getItem("currentTime"))
      : 0
  );
  return (
    <MusicPlayerSongUploadContext.Provider
      value={{
        play,
        setPlay,
        currentTime,
        setCurrentTime,
        isUsingUpload,
        setUsingUpload,
        songImage,
        songLink,
        songName,
        setRepresentation,
        setSongImage,
        setSongLink,
        setSongName,
        representation,
      }}
    >
      {children}
    </MusicPlayerSongUploadContext.Provider>
  );
};
export default MusicPlayerSongUploadContext;
