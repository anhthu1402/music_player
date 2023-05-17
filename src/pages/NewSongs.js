import React, { useContext, useState } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import { PlayCircleFilledRounded } from "@mui/icons-material";
import TrackItem from "../components/Item/TrackItem";
import "../styles/PageNewSongs.css";
import NewSongsCountry from "../components/NewSongsCountry";

function NewSongs() {
  const player = useContext(MusicPlayerContext);
  const [country, setCountry] = useState("all");
  return (
    <div>
      <h1 className="newSongsHeader">Nhạc mới phát hành</h1>
      <div className="newSongsBtn">
        <button
          className={country === "all" ? "active" : "inactive"}
          onClick={() => setCountry("all")}
        >
          Tất cả
        </button>
        <button
          className={country === "vietnam" ? "active" : "inactive"}
          onClick={() => setCountry("vietnam")}
        >
          Việt Nam
        </button>
        <button
          className={country === "other" ? "active" : "inactive"}
          onClick={() => setCountry("other")}
        >
          Quốc tế
        </button>
      </div>
      <div className="librarySongContent">
        {country === "all" && <NewSongsCountry country={"0"} />}
        {country === "vietnam" && <NewSongsCountry country={"1"} />}
        {country === "other" && <NewSongsCountry country={"-1"} />}
      </div>
    </div>
  );
}

export default NewSongs;
