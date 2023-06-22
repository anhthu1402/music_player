import React from "react";
import "../../styles/ArtistAlbumItem.css";
import {
  MoreHoriz,
  PlayCircleFilled,
  FavoriteBorderRounded,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import AlbumPopup from "../AlbumPopup";
import { useRef } from "react";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { showNotification } from "../../service";
import { useContext } from "react";
import NotificationContext from "../../NotificationContext";
import { useSelector } from "react-redux";

function ArtistAlbumItem({ item }) {
  const { isAuthed } = useSelector((state) => state.auth);
  function getReleaseYear(dateParam) {
    const date = new Date(dateParam);
    return date.getFullYear();
  }
  const notification = useContext(NotificationContext);
  const popupRef = useRef();
  const openPopup = () => popupRef.current.open();
  const closePopup = () => popupRef.current.close();
  const [isFavorite, setFavorite] = useState(false);
  return (
    <div className="artistAblumDetail">
      <div className="artistAlbum">
        <div className="albumImage">
          <img src={item.albumImage} alt={item.albumName} />
        </div>
        <div className="albumMoreDetail">
          <button className="btn">
            {isAuthed ? (
              isFavorite ? (
                <FavoriteRounded
                  sx={{ fontSize: "2.1vw", color: "#ff7394" }}
                  onClick={() => {
                    setFavorite(false);
                    showNotification(
                      notification,
                      "Đã xóa album khỏi thư viện yêu thích"
                    );
                  }}
                />
              ) : (
                <FavoriteBorderOutlined
                  sx={{ fontSize: "2.1vw", color: "white" }}
                  onClick={() => {
                    setFavorite(true);
                    showNotification(
                      notification,
                      "Đã thêm album vào thư viện yêu thích"
                    );
                  }}
                />
              )
            ) : (
              <FavoriteBorderOutlined
                sx={{ fontSize: "2.1vw", color: "white" }}
                onClick={() => {
                  showNotification(
                    notification,
                    "Đăng nhập để thêm album vào thư viện yêu thích"
                  );
                }}
              />
            )}
          </button>
          <Link to={"/album/" + item.albumName} state={item}>
            <button>
              <PlayCircleFilled sx={{ fontSize: "2.4vw" }} />
            </button>
          </Link>

          <button onClick={openPopup}>
            <Tooltip title="Khác">
              <MoreHoriz sx={{ fontSize: "2.4vw" }} />
            </Tooltip>
            <AlbumPopup
              albumId={item.id}
              closePopup={closePopup}
              popupRef={popupRef}
            />
          </button>
        </div>
      </div>
      <div className="albumTitle">
        <Link
          to={"/album/" + item.albumName}
          state={item}
          style={{ color: "black" }}
        >
          <h3 style={{ fontSize: "1.2vw" }} onClick={() => console.log("ghuj")}>
            {item.albumName}
          </h3>
        </Link>
        <h4 style={{ fontWeight: "normal", fontSize: "1vw" }}>
          {getReleaseYear(item.releaseDate)}
        </h4>
      </div>
    </div>
  );
}

export default ArtistAlbumItem;
