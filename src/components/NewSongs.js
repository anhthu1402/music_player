import React from "react";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { PlayCircleFilled } from "@mui/icons-material";
import TrackItem from "./Item/TrackItem";
import { SongData } from "./Data/SongData";
import "../styles/NewSongs.css";
function NewSongs() {
  const tracks = SongData;
  const song = useContext(MusicPlayerContext);

  return (
    <div className="listSongContainer">
      <div className="listSongHeader">
        <div className="active">Tất cả</div>
        <div>Việt Nam</div>
        <div>US-UK</div>
        <div>Châu Á</div>
        <div>Khác</div>
      </div>
      <div className="listSongBody">
        {SongData.map(
          (item, key) =>
            key < 9 && (
              <div class="track">
                <TrackItem item={item} key={key} className="trackItem" />
                <div className="fauxImg">
                  <PlayCircleFilled
                    fontSize="large"
                    className="icon"
                    onClick={() => {
                      song.setUsing(true);
                      song.setTracks(tracks);
                      song.setSongIndex(key);
                      song.setSong(tracks[key]);
                    }}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default NewSongs;
