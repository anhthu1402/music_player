import React, { useContext } from "react";
import { PlayCircleFilled } from "@mui/icons-material";
import "../../styles/TrackItem.css";
import MusicPlayerSongUploadContext from "../../MusicplayerSongUploadContext";

function UploadedSongItem({
  songName,
  songLink,
  timeLimit,
  representation,
  songImage,
}) {
  const MusicPlayerSongUpload = useContext(MusicPlayerSongUploadContext);
  return (
    <div className="item">
      <div className="songImg">
        <img src={`${songImage}`} alt={songName} />
        <PlayCircleFilled
          className="playSongIcon"
          onClick={() => {
            MusicPlayerSongUpload.setUsingUpload(true);
            MusicPlayerSongUpload.setSongName(songName);
            MusicPlayerSongUpload.setSongImage(songImage);
            MusicPlayerSongUpload.setSongLink(songLink);
            MusicPlayerSongUpload.setRepresentation(representation);
            MusicPlayerSongUpload.setPlay(true);
            localStorage.setItem("play", JSON.stringify(true));
            MusicPlayerSongUpload.setCurrentTime(0);
            localStorage.setItem("isUsing", JSON.stringify(true));
            localStorage.setItem("songName", JSON.stringify(songName));
            localStorage.setItem("songLink", JSON.stringify(songLink));
            localStorage.setItem("songImage", JSON.stringify(songImage));
            localStorage.setItem(
              "representation",
              JSON.stringify(representation)
            );
            localStorage.setItem("currentTime", 0);
          }}
        />
      </div>
      <div className="songDetail">
        <div className="songTitle">{songName}</div>
        <div className="songUploadArtist">{representation}</div>
        <div className="songUploadtrackDuration ">{timeLimit}</div>
      </div>
    </div>
  );
}

export default UploadedSongItem;
