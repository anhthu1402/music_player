import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  MoreHoriz,
  FavoriteBorderOutlined,
  PlayCircleFilled,
  QueueRounded,
  PlaylistAddRounded,
  QueueMusicRounded,
  AddCircleRounded,
  FileDownloadOutlined,
  LyricsOutlined,
  NotInterestedOutlined,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../../styles/TrackItem.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getMyPlaylists } from "../API/getMyPlaylists";
import { Button, ButtonGroup } from "@mui/material";

class TrackItem extends Component {
  render() {
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
        <div className="songImg">
          <img
            src={`${this.props.item.songImage}`}
            alt={this.props.item.songName}
          />
          <PlayCircleFilled
            className="playSongIcon"
            onClick={() => {
              if (this.props.song.isUsing !== true) {
                this.props.song.setUsing(true);
              }
              this.props.song.setPlay(true);
              this.props.song.setSong(this.props.item);
              this.props.song.setTracks(this.props.tracks);
              this.props.song.setPlaylist(this.props.tracks);
              this.props.song.setSongIndex(this.props.index);
              localStorage.setItem("song", JSON.stringify(this.props.item));
              localStorage.setItem("tracks", JSON.stringify(this.props.tracks));
              localStorage.setItem(
                "playlist",
                JSON.stringify(this.props.tracks)
              );
              localStorage.setItem("index", JSON.stringify(this.props.index));
              localStorage.setItem("play", JSON.stringify(true));
              localStorage.setItem("currentTime", 0);
              this.props.song.setCurrentTime(0);
            }}
          />
        </div>

        <div className="songDetail">
          <div className="songTitle">{this.props.item.songName}</div>
          <div className="artist">
            {this.props.item.representation.map((child, index) => (
              <span key={index} item={child}>
                <Link to={`/artist/${child.artistName}`} state={child}>
                  {child.artistName}
                </Link>
              </span>
            ))}
          </div>
          <div className="trackReleaseDate">
            {this.props.item.releaseDate === undefined
              ? ""
              : printReleaseDate(this.props.item.releaseDate)}
          </div>
          <div className="trackDuration">{this.props.item.timeLimit}</div>
        </div>
        <div className="rightIcon">
          {this.props.item.isFavorite === 0 ? (
            <FavoriteBorderOutlined
              fontSize="medium"
              className="favOutlineIcon"
            />
          ) : (
            <FavoriteIcon fontSize="medium" className="favIcon" />
          )}
          <Popup
            contentStyle={{
              zIndex: "2000",
              marginTop: 10,
              width: "25%",
              padding: 0,
            }}
            arrow={false}
            trigger={<MoreHoriz fontSize="medium" className="moreIcon" />}
            position={"bottom right"}
            on={"click"}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "10px",
              }}
            >
              <img
                src={`${this.props.item.songImage}`}
                alt={this.props.item.songName}
                width={50}
                height={50}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 10,
                }}
              >
                <p
                  style={{
                    fontSize: `20px`,
                    fontWeight: "500",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    marginBottom: 1,
                    
                    width: '12vw',
                    maxWidth: '400px'
                  }}
                >
                  {this.props.item.songName}
                </p>
                <div className="artistPopup">
                  {this.props.item.representation.map((child, index) => (
                    <span key={index} item={child}>
                      <Link to={`/artist/${child.artistName}`} state={child}>
                        {child.artistName}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 7,
              }}
            >
              <ButtonGroup variant="outlined" size="medium">
                <Button className="buttonPopup">
                  <FileDownloadOutlined fontSize="small" />
                  <p style={{ fontSize: "12px" }}>Tải xuống</p>
                </Button>
                <Button className="buttonPopup">
                  <LyricsOutlined fontSize="small" />
                  <p style={{ fontSize: "12px" }}>Lời bài hát</p>
                </Button>
                <Button className="buttonPopup">
                  <NotInterestedOutlined fontSize="small" />
                  <p style={{ fontSize: "12px" }}>Chặn</p>
                </Button>
              </ButtonGroup>
            </div>
            <div className="songItemPopup">
              <FavoriteBorderOutlined
                fontSize="small"
                sx={{ color: "grey", marginRight: 1 }}
              />
              <p>Thêm vào thư viện</p>
            </div>
            <div className="songItemPopup">
              <QueueRounded
                fontSize="small"
                sx={{ color: "grey", marginRight: 1 }}
              />
              <p>Thêm vào danh sách phát</p>
            </div>
            <Popup
              contentStyle={{
                width: "17%",
                padding: 10,
              }}
              trigger={
                <div className="songItemPopup">
                  <PlaylistAddRounded
                    fontSize="small"
                    sx={{ color: "grey", marginRight: 1 }}
                  />
                  <p>Thêm vào playlist</p>
                </div>
              }
              on={"hover"}
              position={"left center"}
            >
              <div className="songItemPopup">
                <AddCircleRounded
                  fontSize="small"
                  sx={{ color: "grey", marginRight: 1 }}
                />
                <p>Tạo playlist mới</p>
              </div>
              {getMyPlaylists.map((playlist, index) => (
                <div key={index} className="songItemPopup">
                  <QueueMusicRounded
                    fontSize="small"
                    sx={{ color: "grey", marginRight: 1 }}
                  />
                  <p>{playlist.playlistName}</p>
                </div>
              ))}
            </Popup>
          </Popup>
        </div>
      </div>
    );
  }
}

export default TrackItem;
