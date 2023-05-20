import React, { Component } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  MoreHoriz,
  PlayArrowRounded,
} from "@mui/icons-material";
import "../../styles/SongItem.css";
import { Link } from "react-router-dom";

class SongItem extends Component {
  render() {
    function getImgUrl(url) {
      return require("../../assets/" + url);
    }
    return (
      <Card className={"cardSong"}>
        <CardContent className={"songItem"}>
          <CardMedia
            className="songMedia"
            component="img"
            height="100%"
            style={{
              width: `60px`,
              height: `60px`,
              marginRight: `20px`,
              border: `0.2px solid transparent`,
              borderRadius: `3px`,
            }}
            image={getImgUrl(`${this.props.item.image}`)}
            alt={this.props.item.title}
          />
          <button
            className="playBtn"
            onClick={() => {
              this.props.song.setUsing(true);
              this.props.song.setSong(this.props.item);
              this.props.song.setTracks(this.props.tracks);
              this.props.song.setSongIndex(this.props.index);
            }}
          >
            <PlayArrowRounded />
          </button>
          <div className={"Detail"}>
            <div className={"songHeader"}>
              <Typography gutterBottom variant="h5" className={"songTitle"}>
                {this.props.item.title}
              </Typography>
              <Typography variant="body2" className={"songArtist"}>
                {this.props.item.artist.map((child, index) => {
                  return (
                    <span key={index} item={child} className="artist">
                      <Link
                        to={`/artist/${child.artistName}`}
                        state={child}
                        color="grey"
                      >
                        {child.artistName}
                      </Link>
                    </span>
                  );
                })}
              </Typography>
            </div>
            <div className={"songMoreDetail"}>
              <Typography
                sx={{ cursor: `pointer` }}
                variant="icon"
                component={
                  this.props.item.isFavorite
                    ? FavoriteIcon
                    : FavoriteBorderOutlined
                }
                color={this.props.item.isFavorite ? "#ff4672" : ""}
                className={
                  this.props.item.isFavorite ? "songFavorite" : "noneFavorite"
                }
              />
              <Typography className={"time"}>{this.props.item.time}</Typography>
              <button className="moreOption">
                <MoreHoriz />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default SongItem;
