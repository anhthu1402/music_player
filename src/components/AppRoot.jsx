import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import AppAppBar from "./AppAppBar";
import Notification from "./Notification";
import NavBarPlaylist from "./NavBarPlaylist";
import axios from "axios";

function AppRoot() {
  const [songs, setSongs]=useState([]);
  useEffect(() => {
    axios.get("/api/getSongById/1").then((res) => {
      const Songs = res.data.song;
      setSongs(Songs);
    });
  });
  
  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ position: `fixed`, top: `0`, left: 0 }}>
          <SideBar />
        </div>

        <div
          style={{
            padding: `2vw 3vw 0 3vw`,
            width: `calc(100% - 17vw)`,
            position: `relative`,
            left: `17vw`,
            height: `calc(100%-18vh)`,
          }}
        >
          <AppAppBar />
          <div>
          {/* {songs.map((item) => (
            <div key={item.id}>{item.SongName}</div>
          ))} */}
          {songs.map((item) => (
            <div key={item.id}>{item.SongName}</div>
          ))}
            <Outlet />
          </div>
          <div
            className="musicPlayer"
            style={{
              // width: `calc(100% - 17vw)`,
              width: `100%`,
            }}
          >
            <MusicPlayer />
          </div>
          <Notification />
          <NavBarPlaylist />
        </div>
      </div>
    </>
  );
}

export default AppRoot;
