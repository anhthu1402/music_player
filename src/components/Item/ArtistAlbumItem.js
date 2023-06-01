import React from "react";
import "../../styles/ArtistAlbumItem.css";
import {
  MoreHoriz,
  PlayCircleFilled,
  FavoriteBorderRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import AlbumPopup from "../AlbumPopup";
import { useRef } from "react";

function ArtistAlbumItem({ item }) {
  function getReleaseYear(dateParam) {
    const date = new Date(dateParam);
    return date.getFullYear();
  }
  const popupRef = useRef();
  const openPopup = () => popupRef.current.open();
  const closePopup = () => popupRef.current.close();
  return (
    <div className="artistAblumDetail">
      <div className="artistAlbum">
        <div className="albumImage">
          <img src={item.albumImage} alt={item.albumName} />
        </div>
        <div className="albumMoreDetail">
          <button className="btn">
            <FavoriteBorderRounded sx={{ fontSize: "2.4vw" }} />
          </button>
          <Link to={"/album/" + item.albumName} state={item.id}>
            <button>
              <PlayCircleFilled sx={{ fontSize: "2.4vw" }} />
            </button>
          </Link>

          <button onClick={openPopup}>
            <MoreHoriz sx={{ fontSize: "2.4vw" }} />
            <AlbumPopup
              albumId={item.id}
              closePopup={closePopup}
              popupRef={popupRef}
            />
          </button>
        </div>
      </div>
      <div className="albumTitle">
        <h3 style={{ fontSize: "1.2vw" }}>{item.albumName}</h3>
        <h4 style={{ fontWeight: "normal", fontSize: "1vw" }}>
          {getReleaseYear(item.releaseDate)}
        </h4>
      </div>
    </div>
  );
}

export default ArtistAlbumItem;
