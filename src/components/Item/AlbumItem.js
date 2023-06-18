import React from "react";
import { Link } from "react-router-dom";

function AlbumItem({ item }) {
  function printReleaseDate(dateParam) {
    const date = new Date(dateParam);
    const DAY_IN_MS = 86400000;
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(seconds / 3600);
    const days = Math.round(seconds / 86400);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const weeks = Math.round(seconds / 604800000);

    if (seconds < 5) {
      return "Hiện tại";
    } else if (seconds < 60) {
      return `${seconds} giây trước`;
    } else if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 11) {
      return `${hours} giờ trước`;
    } else if (isToday) {
      return "Hôm nay";
    } else if (isYesterday) {
      return "Hôm qua";
    } else if (days < 7) {
      return `${days} ngày trước`;
    } else if (weeks > 0 && weeks < 4) {
      return `${weeks} tuần trước`;
    }
    return date.toJSON().slice(0, 10).split("-").reverse().join("/");
  }

  return (
    <div className="item">
      <div className="albumImg">
        <img src={item.albumImage} alt={item.albumName} />
      </div>

      <div className="albumDetail">
        <div>
          <Link to={`/album/${item.albumName}`} state={item}>
            {item.albumName}
          </Link>
        </div>
        <div className="artist">
          {item.artist.map((child, index) => (
            <span key={index} item={child}>
              <Link to={`/artist/${child.artistName}`} state={child}>
                {child.artistName}
              </Link>
            </span>
          ))}
        </div>
        <div className="albumReleaseDate">
          {printReleaseDate(item.releaseDate)}
        </div>
      </div>
    </div>
  );
}

export default AlbumItem;
