import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import "../../styles/SongItem.css";

function SongItem({ item }) {
  function getImgUrl(url) {
    return require("../../assets/" + url);
  }
  return (
    <Card className={"cardSong"}>
      <CardActionArea>
        <CardContent className={"songItem"}>
          <CardMedia
            component="img"
            height="100%"
            style={{
              width: `60px`,
              height: `60px`,
              marginRight: `20px`,
              border: `0.2px solid transparent`,
              borderRadius: `3px`,
            }}
            image={getImgUrl(`${item.image}`)}
            alt={item.title}
          />
          <div className={"Detail"}>
            <div className={"songHeader"}>
              <Typography gutterBottom variant="h5" className={"songTitle"}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={"songArtist"}
              >
                {item.artist}
              </Typography>
            </div>
            <div className={"songMoreDetail"}>
              <Typography
                variant="icon"
                component={
                  item.isFavorite ? FavoriteIcon : FavoriteBorderOutlined
                }
                className={item.isFavorite ? "songFavorite" : "noneFavorite"}
              />
              <Typography className={"time"}>{item.time}</Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SongItem;
