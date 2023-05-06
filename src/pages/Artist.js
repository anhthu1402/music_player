import React from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import "../styles/Artist.css";
import { Avatar, Button } from "@mui/material";
import {
  PlayCircleFilledRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";

function Artist() {
  const player = useContext(MusicPlayerContext);
  const location = useLocation();
  const artist = location.state;
  return (
    <div>
      {artist && (
        <div
          className={
            player.isUsing ? "artistDetail active" : "artistDetail inactive"
          }
        >
          <div className="header">
            <div className="headerDetail">
              <Avatar
                alt={artist.name}
                src={require(`../assets/${artist.image}`)}
                sx={{ width: "9em", height: "9em", marginRight: "2em" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h1 style={{ fontSize: "3.5em", marginRight: "20px" }}>
                    {artist.name}
                  </h1>
                  <PlayCircleFilledRounded
                    className="buttonPlay"
                    sx={{ fontSize: "4em" }}
                  />
                </div>
                <h4>927.713 người theo dõi</h4>
                <Button className="followBtn">
                  <PersonAddAltRounded sx={{ marginRight: "10px" }} /> Theo dõi
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Artist;
