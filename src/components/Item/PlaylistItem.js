import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { MoreHoriz, PlayCircleFilled } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import "../../styles/PlaylistItem.css";
import { Link } from "react-router-dom";

function PlaylistItem({ item }) {
  // function getPlaylistImgUrl(url) {
  //   return require("../../assets/" + url);
  // }
  return (
    <Card className={"cardPlaylist"} sx={{ border: "none", boxShadow: "none" }}>
      <div className="cardContent">
        <CardMedia
          className="playlistMedia"
          component="img"
          style={{
            width: `18vw`,
            height: `17vw`,
            border: `0.2px solid transparent`,
            borderRadius: `15px`,
          }}
          image={`${item.playlistImg}`}
          alt={item.playlistName}
        />
        <div className="playlistMoreDetail">
          <button className="btn">
            <ClearIcon sx={{ fontSize: "2.1vw" }} />
          </button>
          <Link to={`/playlistDetail/${item.playlistName}`} state={item.id}>
            <button>
              <PlayCircleFilled sx={{ fontSize: "2.1vw" }} />
            </button>
          </Link>
          <button>
            <MoreHoriz sx={{ fontSize: "2.1vw" }} />
          </button>
        </div>
      </div>
      <Typography
        component="header"
        sx={{ fontSize: `1.35vw`, marginTop: `0.4vw` }}
      >
        {item.playlistName}
      </Typography>
      <Typography component="p" color={"grey"} sx={{ fontSize: "1vw" }}>
        {item.user}
      </Typography>
    </Card>
  );
}

export default PlaylistItem;
