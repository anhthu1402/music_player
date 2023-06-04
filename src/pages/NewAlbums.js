import React, { useContext, useState } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayCircleFilledRounded,
} from "@mui/icons-material";
import AlbumItem from "../components/Item/AlbumItem";
import "../styles/NewAlbums.css";
import { AlbumData } from "../components/Data/AlbumData";
import { getAllAlbum } from "../components/API/getAllAlbums";
import { getAlbumDetail } from "../service";
import { useRef } from "react";
import AlbumPopup from "../components/AlbumPopup";

function NewAlbums() {
  const [toggleState, setToggleState] = useState(1);
  const albumsByCountry = [];
  getAllAlbum.map((item, index) => {
    if (toggleState === 1) {
      albumsByCountry.push(item);
    } else if (toggleState === 2) {
      item.country.map((child) => {
        if (child.id === 1) {
          albumsByCountry.push(item);
        }
      });
    } else if (toggleState === 3) {
      item.country.map((child) => {
        if (child.id === 3 || child.id === 4) {
          albumsByCountry.push(item);
        }
      });
    } else {
      item.country.map((child) => {
        if (child.id === 2) {
          albumsByCountry.push(item);
        }
      });
    }
  });
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const song = useContext(MusicPlayerContext);
  const [rnd, setRnd] = useState(0);
  const popupRef = useRef();
  const openPopup = () => popupRef.current.open();
  const closePopup = () => popupRef.current.close();

  return (
    <div className="newAlbumReleaseContainer">
      <div className="newAlbumsBtn">
        <button
          className={toggleState === 1 ? "active" : "inactive"}
          onClick={() => toggleTab(1)}
        >
          Tất cả
        </button>
        <button
          className={toggleState === 2 ? "active" : "inactive"}
          onClick={() => toggleTab(2)}
        >
          Việt Nam
        </button>
        <button
          className={toggleState === 3 ? "active" : "inactive"}
          onClick={() => toggleTab(3)}
        >
          US-UK
        </button>
        <button
          className={toggleState === 4 ? "active" : "inactive"}
          onClick={() => toggleTab(4)}
        >
          Hàn Quốc
        </button>
      </div>
      <div className="newAlbumsBodyHeading">
        <div>Album</div>
        <div className="releaseDate">Phát hành</div>
      </div>
      <div className="newAlbumsBody">
        {albumsByCountry.map((item, key) => (
          <div class="albumContainer">
            <AlbumItem item={item} key={key} className="albumItem" />
            <div className="fauxImg">
              <PlayCircleFilledRounded
                fontSize="large"
                className="icon"
                onClick={() => {
                  const albumDetail = getAlbumDetail(item.id);
                  const songs = albumDetail.songs;
                  setRnd(Math.floor(Math.random() * songs.length));
                  song.setUsing(true);
                  song.setTracks(songs);
                  song.setSongIndex(rnd);
                  song.setSong(songs[rnd]);
                  song.setPlay(true);
                  localStorage.setItem("song", JSON.stringify(songs[rnd]));
                  localStorage.setItem("tracks", JSON.stringify(songs));
                  localStorage.setItem("playlist", JSON.stringify(songs));
                  localStorage.setItem("index", JSON.stringify(rnd));
                  localStorage.setItem("play", JSON.stringify(true));
                  song.setPlaylist(songs);
                }}
              />
            </div>
            <div className="rightIcon">
              <FavoriteBorderOutlined
                fontSize="large"
                className="favOutlineIcon"
              />
              <MoreHoriz
                fontSize="large"
                className="moreHoriz"
                onClick={() => openPopup()}
              />
              <AlbumPopup
                albumId={item.id}
                closePopup={closePopup}
                popupRef={popupRef}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewAlbums;
