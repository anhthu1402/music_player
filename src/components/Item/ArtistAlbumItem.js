import React from "react";
import "../../styles/ArtistAlbumItem.css";
import {
  MoreHoriz,
  PlayCircleFilled,
  FavoriteBorderRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function ArtistAlbumItem({ item }) {
  function getReleaseYear(dateParam) {
    const date = new Date(dateParam);
    return date.getFullYear();
  }
  return (
    <div className="artistAblumDetail">
      <div className="artistAlbum">
        <div className="albumImage">
          <img src={item.albumImage} alt={item.albumName} />
        </div>
        <div className="albumMoreDetail">
          <button className="btn">
            <FavoriteBorderRounded fontSize="large" />
          </button>
          <Link>
            <button>
              <PlayCircleFilled fontSize="large" />
            </button>
          </Link>
          <button>
            <MoreHoriz fontSize="large" />
          </button>
        </div>
      </div>
      <div className="albumTitle">
        <h3>{item.albumName}</h3>
        <h4 style={{ fontWeight: "normal" }}>
          {getReleaseYear(item.releaseDate)}
        </h4>
      </div>
    </div>
  );
}

export default ArtistAlbumItem;
